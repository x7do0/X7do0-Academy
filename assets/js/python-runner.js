import { questions } from '../../data/python-practice-questions.js';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            if (window.loadPyodide) resolve();
            else existing.addEventListener('load', resolve, { once: true });
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener('error', () => reject(new Error('تعذر تحميل محرك Python. تحقق من الاتصال وحاول مرة أخرى.')), { once: true });
        document.head.appendChild(script);
    });
}

async function getPyodide() {
    if (!pyodidePromise) {
        pyodidePromise = (async () => {
            await loadScript(`${PYODIDE_BASE}pyodide.js`);
            return window.loadPyodide({ indexURL: PYODIDE_BASE });
        })().catch(error => {
            pyodidePromise = null;
            throw error;
        });
    }
    return pyodidePromise;
}

function normalizeOutput(value = '') {
    return String(value)
        .replace(/\r\n/g, '\n')
        .trim()
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n');
}

function getCurrentQuestion() {
    const questionId = Number.parseInt(new URLSearchParams(window.location.search).get('id'), 10);
    return questions.find(question => question.id === questionId) || null;
}

function getExpectedOutput() {
    return normalizeOutput(getCurrentQuestion()?.output || '');
}

function getSolutionCode() {
    return getCurrentQuestion()?.code || '';
}

function getAutomaticInputs() {
    const values = getExpectedOutput()
        .split('\n')
        .map(line => line.match(/^Enter\b[^:]*:\s*(.+)$/i)?.[1]?.trim())
        .filter(Boolean);
    return values.length ? values : ['0'];
}

function starterCode() {
    const prompt = getCurrentQuestion()?.prompt || '';
    return prompt.includes('input') || prompt.includes('إدخال')
        ? '# اكتب حلك هنا\nvalue = input()\nprint(value)'
        : '# اكتب حلك هنا\nprint("مرحباً من Python")';
}

function setStatus(element, type, title) {
    const styles = {
        match: ['var(--success-soft)', 'var(--success)', 'var(--success)'],
        close: ['rgba(245,158,11,.1)', 'rgba(245,158,11,.55)', '#d97706'],
        mismatch: ['rgba(239,68,68,.09)', 'rgba(239,68,68,.45)', '#ef4444']
    };
    const [background, border, color] = styles[type] || styles.mismatch;
    element.style.background = background;
    element.style.borderColor = border;
    element.style.color = color;
    element.textContent = title;
    element.hidden = false;
}

function outputSimilarity(actual, expected) {
    const tokens = value => value.toLocaleLowerCase()
        .match(/[\p{L}\p{N}_]+|[^\s]/gu) || [];
    const actualTokens = new Set(tokens(actual));
    const expectedTokens = new Set(tokens(expected));
    if (!actualTokens.size || !expectedTokens.size) return 0;
    const shared = [...actualTokens].filter(token => expectedTokens.has(token)).length;
    return shared / Math.max(actualTokens.size, expectedTokens.size);
}

function classifyOutput(actual, expected, hasError) {
    if (hasError || !actual) return 'mismatch';
    if (actual === expected) return 'match';
    if (
        actual.includes(expected)
        || expected.includes(actual)
        || outputSimilarity(actual, expected) >= 0.5
    ) {
        return 'close';
    }
    return 'mismatch';
}

function getCodeHint(level) {
    const lines = getSolutionCode().split('\n');
    const ratio = level === 1 ? 0.35 : 0.65;
    const cutoff = Math.max(2, Math.ceil(lines.length * ratio));
    const excerpt = lines.slice(0, cutoff).join('\n').trimEnd();
    return `${excerpt}\n\n# أكمل الحل هنا`;
}

function applyCodeHint(editor, hint, initialCode) {
    const shouldReplace = (
        !editor.value.trim()
        || editor.value === initialCode
        || editor.value.includes('# أكمل الحل هنا')
    );

    if (shouldReplace) {
        editor.value = hint;
    } else {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const prefix = editor.value.slice(0, start);
        const suffix = editor.value.slice(end);
        const separator = prefix && !prefix.endsWith('\n') ? '\n\n' : '';
        editor.value = `${prefix}${separator}${hint}${suffix}`;
    }

    editor.focus();
    editor.selectionStart = editor.selectionEnd = editor.value.length;
}

function buildRunner() {
    const questionView = document.getElementById('question-view');
    const stepsSection = document.getElementById('q-steps');
    if (!questionView || !stepsSection || document.getElementById('python-runner')) return;

    const section = document.createElement('section');
    section.id = 'python-runner';
    section.innerHTML = `
        <button type="button" class="reveal-toggle runner-toggle" aria-expanded="false">
            <span><i class="fas fa-code me-2" aria-hidden="true"></i>جرّب الحل بنفسك</span>
            <i class="fas fa-chevron-down reveal-icon" aria-hidden="true"></i>
        </button>
        <div class="reveal-content">
            <div class="runner-workspace">
                <label class="block">
                    <span class="text-sm font-bold text-academic-primary block mb-2">كود Python</span>
                    <textarea id="runner-code" class="runner-code-input" dir="ltr" spellcheck="false" aria-label="محرر كود Python">${starterCode()}</textarea>
                </label>
                <div class="runner-actions">
                    <button id="runner-run" type="button" class="btn-accent px-5 py-2.5 rounded-lg font-bold"><i class="fas fa-play me-2"></i>تشغيل</button>
                    <button id="runner-reset" type="button" class="runner-secondary-button"><i class="fas fa-rotate-left me-2"></i>مسح</button>
                    <button data-runner-hint="1" type="button" class="runner-secondary-button">تلميح برمجي 1</button>
                    <button data-runner-hint="2" type="button" class="runner-secondary-button">تلميح برمجي 2</button>
                </div>
                <div id="runner-result" hidden role="status" aria-live="polite" class="runner-result"></div>
            </div>
        </div>
    `;

    stepsSection.insertAdjacentElement('afterend', section);

    const code = document.getElementById('runner-code');
    const result = document.getElementById('runner-result');
    const runButton = document.getElementById('runner-run');
    const initialCode = code.value;

    runButton.addEventListener('click', async () => {
        const source = code.value.trim();
        if (!source) {
            setStatus(result, 'mismatch', 'غير مطابق');
            return;
        }

        runButton.disabled = true;

        try {
            const pyodide = await getPyodide();
            const inputs = getAutomaticInputs();
            let stdout = '';
            let stderr = '';
            pyodide.setStdout({ batched: value => { stdout += `${value}\n`; } });
            pyodide.setStderr({ batched: value => { stderr += `${value}\n`; } });
            pyodide.globals.set('__academy_inputs', inputs);
            await pyodide.runPythonAsync(`
import builtins
_inputs = list(__academy_inputs)
_index = 0
def _academy_input(prompt=''):
    global _index
    if prompt:
        print(prompt, end='')
    if not _inputs:
        return '0'
    value = _inputs[_index] if _index < len(_inputs) else _inputs[-1]
    _index += 1
    return value
builtins.input = _academy_input
`);
            await pyodide.runPythonAsync(source);

            const actual = normalizeOutput(stdout);
            const expected = getExpectedOutput();
            const classification = classifyOutput(actual, expected, Boolean(stderr.trim()));
            const labels = {
                match: 'مطابق',
                close: 'قريب',
                mismatch: 'غير مطابق'
            };
            setStatus(result, classification, labels[classification]);
        } catch (error) {
            console.error('[PythonRunner]', error);
            setStatus(result, 'mismatch', 'غير مطابق');
        } finally {
            runButton.disabled = false;
        }
    });

    document.getElementById('runner-reset').addEventListener('click', () => {
        code.value = initialCode;
        result.hidden = true;
        code.focus();
    });

    document.querySelectorAll('[data-runner-hint]').forEach(button => {
        button.addEventListener('click', () => {
            const level = Number(button.dataset.runnerHint);
            applyCodeHint(code, getCodeHint(level), initialCode);
        });
    });
}

const observer = new MutationObserver(() => {
    if (document.getElementById('q-steps')) {
        buildRunner();
        observer.disconnect();
    }
});

observer.observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', buildRunner);
