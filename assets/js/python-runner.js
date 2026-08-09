import { questions } from '../../data/python-practice-questions.js';
import { validationInputs } from '../../data/python-practice-validation.js';
import { createProgressTracker } from './progress-tracker.js';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const tracker = createProgressTracker('python', questions);

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

function getSolutionCode() {
    return getCurrentQuestion()?.code || '';
}

function getValidationInputs() {
    return validationInputs[getCurrentQuestion()?.id] || [[]];
}

function starterCode() {
    const prompt = getCurrentQuestion()?.prompt || '';
    return prompt.includes('input') || prompt.includes('إدخال')
        ? '# اكتب حلك هنا\nvalue = input()\nprint(value)'
        : '# اكتب حلك هنا\nprint("مرحباً من Python")';
}

function setStatus(element, type, title) {
    const icons = {
        match: 'fa-circle-check',
        close: 'fa-circle-exclamation',
        mismatch: 'fa-circle-xmark'
    };
    element.className = `runner-result runner-result--${type}`;
    element.innerHTML = type === 'match'
        ? `<i class="fas ${icons[type]}" aria-hidden="true"></i><span><strong>${title}</strong><small>تم تسجيل التمرين كمكتمل تلقائياً.</small></span>`
        : `<i class="fas ${icons[type]}" aria-hidden="true"></i><strong>${title}</strong>`;
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

function classifyResults(results) {
    if (results.every(result => !result.hasError && result.actual === result.expected)) {
        return 'match';
    }

    const comparable = results.filter(result => !result.hasError && result.actual);
    if (
        comparable.length
        && comparable.some(result => outputSimilarity(result.actual, result.expected) >= 0.5)
    ) {
        return 'close';
    }

    return 'mismatch';
}

async function executeCode(pyodide, source, inputs) {
    let stdout = '';
    let stderr = '';
    pyodide.setStdout({ batched: value => { stdout += `${value}\n`; } });
    pyodide.setStderr({ batched: value => { stderr += `${value}\n`; } });
    pyodide.globals.set('__academy_inputs', inputs);
    pyodide.globals.set('__academy_source', source);

    try {
        await pyodide.runPythonAsync(`
import builtins
import random

_inputs = list(__academy_inputs)
_index = 0

def _academy_input(prompt=''):
    global _index
    if not _inputs:
        return '0'
    value = _inputs[_index] if _index < len(_inputs) else _inputs[-1]
    _index += 1
    return value

builtins.input = _academy_input
random.seed(1729)
exec(compile(__academy_source, '<academy>', 'exec'), {'__name__': '__main__'})
`);
    } catch (error) {
        stderr += error?.message || String(error);
    }

    return {
        output: normalizeOutput(stdout),
        hasError: Boolean(stderr.trim())
    };
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
            const results = [];

            for (const inputs of getValidationInputs()) {
                const expected = await executeCode(pyodide, getSolutionCode(), inputs);
                const actual = await executeCode(pyodide, source, inputs);
                results.push({
                    actual: actual.output,
                    expected: expected.output,
                    hasError: actual.hasError || expected.hasError
                });
            }

            const classification = classifyResults(results);
            const labels = {
                match: 'أحسنت! الحل صحيح',
                close: 'قريب',
                mismatch: 'غير مطابق'
            };
            setStatus(result, classification, labels[classification]);

            if (classification === 'match') {
                const question = getCurrentQuestion();
                if (question) {
                    tracker.markQuestionCompleted(question.id);
                    document.dispatchEvent(new CustomEvent('academy:question-completed', {
                        detail: { questionId: question.id }
                    }));
                }
            }
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
