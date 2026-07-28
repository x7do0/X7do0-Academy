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

function getExpectedOutput() {
    return normalizeOutput(document.querySelector('.code-panel--output code')?.textContent || '');
}

function starterCode() {
    const prompt = document.querySelector('#q-prompt')?.textContent || '';
    return prompt.includes('input') || prompt.includes('إدخال')
        ? '# اكتب حلك هنا\nvalue = input()\nprint(value)'
        : '# اكتب حلك هنا\nprint("مرحباً من Python")';
}

function setStatus(element, type, title, details = '') {
    const styles = {
        idle: ['var(--bg-interactive)', 'var(--border-subtle)', 'var(--text-secondary)'],
        loading: ['var(--accent-soft)', 'var(--border-accent)', 'var(--accent)'],
        success: ['var(--success-soft)', 'var(--success)', 'var(--success)'],
        error: ['rgba(239,68,68,.09)', 'rgba(239,68,68,.45)', '#ef4444']
    };
    const [background, border, color] = styles[type] || styles.idle;
    element.style.background = background;
    element.style.borderColor = border;
    element.style.color = color;
    element.innerHTML = `<strong>${title}</strong>${details ? `<pre dir="ltr" style="white-space:pre-wrap;margin:.65rem 0 0;font-family:var(--font-mono);font-size:.78rem;color:inherit">${details}</pre>` : ''}`;
}

function unlockLearningFlow() {
    document.querySelectorAll('.reveal-toggle').forEach(button => {
        if (button.textContent.includes('الحل')) {
            button.disabled = false;
            button.removeAttribute('aria-disabled');
            button.style.opacity = '1';
            button.title = '';
        }
    });
    document.querySelectorAll('[data-runner-hint]').forEach(button => {
        button.disabled = false;
        button.style.opacity = '1';
    });
}

function lockSolution() {
    document.querySelectorAll('.reveal-toggle').forEach(button => {
        if (button.textContent.includes('الحل')) {
            button.disabled = true;
            button.setAttribute('aria-disabled', 'true');
            button.style.opacity = '.48';
            button.title = 'اكتب محاولة وشغّلها أولاً';
        }
    });
}

function buildRunner() {
    const questionView = document.getElementById('question-view');
    const prompt = document.getElementById('q-prompt');
    if (!questionView || !prompt || document.getElementById('python-runner')) return;

    const section = document.createElement('section');
    section.id = 'python-runner';
    section.className = 'academic-card p-5 md:p-6 space-y-4';
    section.innerHTML = `
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
                <div class="label mb-1">مساحة المحاولة</div>
                <h2 class="text-xl font-bold text-academic-primary">اكتب الكود وشغّله داخل المتصفح</h2>
                <p class="text-sm text-academic-secondary mt-1">المحرك يُحمّل فقط عند أول تشغيل. لا يتم إرسال كودك إلى خادم.</p>
            </div>
            <span id="runner-engine-state" class="text-xs font-bold text-academic-muted">المحرك غير محمّل</span>
        </div>
        <label class="block">
            <span class="text-sm font-bold text-academic-primary block mb-2">كود Python</span>
            <textarea id="runner-code" dir="ltr" spellcheck="false" aria-label="محرر كود Python" style="width:100%;min-height:260px;resize:vertical;border:1px solid #263246;border-radius:12px;background:#0b1220;color:#e2e8f0;padding:1rem;font:500 .86rem/1.75 'Fira Code',monospace;text-align:left;tab-size:4">${starterCode()}</textarea>
        </label>
        <label class="block">
            <span class="text-sm font-bold text-academic-primary block mb-2">الإدخال stdin — اختياري</span>
            <textarea id="runner-stdin" dir="ltr" spellcheck="false" aria-label="إدخال البرنامج" placeholder="كل قيمة في سطر مستقل" style="width:100%;min-height:80px;resize:vertical;border:1px solid var(--border-subtle);border-radius:10px;background:var(--bg-interactive);color:var(--text-primary);padding:.8rem;font:500 .82rem/1.6 'Fira Code',monospace;text-align:left"></textarea>
        </label>
        <div class="flex flex-wrap gap-2">
            <button id="runner-run" type="button" class="btn-accent px-5 py-2.5 rounded-lg font-bold"><i class="fas fa-play me-2"></i>تشغيل المحاولة</button>
            <button id="runner-reset" type="button" class="px-5 py-2.5 rounded-lg font-bold" style="background:var(--bg-interactive);border:1px solid var(--border-subtle);color:var(--text-primary)"><i class="fas fa-rotate-left me-2"></i>إعادة المحاولة</button>
            <button data-runner-hint="1" type="button" disabled class="px-4 py-2.5 rounded-lg font-bold" style="opacity:.45;background:var(--bg-interactive);border:1px solid var(--border-subtle);color:var(--text-primary)">التلميح الأول</button>
            <button data-runner-hint="2" type="button" disabled class="px-4 py-2.5 rounded-lg font-bold" style="opacity:.45;background:var(--bg-interactive);border:1px solid var(--border-subtle);color:var(--text-primary)">التلميح الثاني</button>
        </div>
        <div id="runner-hint" hidden class="p-4 rounded-lg text-sm" style="background:var(--accent-soft);border:1px solid var(--border-accent);color:var(--text-primary)"></div>
        <div id="runner-result" role="status" aria-live="polite" class="p-4 rounded-lg text-sm" style="border:1px solid var(--border-subtle)"></div>`;

    prompt.insertAdjacentElement('afterend', section);
    lockSolution();

    const code = document.getElementById('runner-code');
    const stdin = document.getElementById('runner-stdin');
    const result = document.getElementById('runner-result');
    const engineState = document.getElementById('runner-engine-state');
    const runButton = document.getElementById('runner-run');
    const initialCode = code.value;
    setStatus(result, 'idle', 'اكتب محاولة ثم اضغط تشغيل.');

    runButton.addEventListener('click', async () => {
        const source = code.value.trim();
        if (!source) {
            setStatus(result, 'error', 'المحرر فارغ', 'اكتب كود Python أولاً.');
            return;
        }

        unlockLearningFlow();
        runButton.disabled = true;
        engineState.textContent = 'جارٍ تحميل المحرك…';
        setStatus(result, 'loading', 'جارٍ تشغيل الكود…');

        try {
            const pyodide = await getPyodide();
            engineState.textContent = 'المحرك جاهز';
            const inputs = stdin.value.replace(/\r\n/g, '\n').split('\n');
            let inputIndex = 0;
            let stdout = '';
            let stderr = '';
            pyodide.setStdout({ batched: value => { stdout += `${value}\n`; } });
            pyodide.setStderr({ batched: value => { stderr += `${value}\n`; } });
            pyodide.globals.set('__academy_inputs', inputs);
            pyodide.globals.set('__academy_input_index', inputIndex);
            await pyodide.runPythonAsync(`
import builtins
_inputs = list(__academy_inputs)
_index = 0
def _academy_input(prompt=''):
    global _index
    if prompt:
        print(prompt, end='')
    if _index >= len(_inputs):
        raise EOFError('لا توجد قيمة إدخال إضافية')
    value = _inputs[_index]
    _index += 1
    return value
builtins.input = _academy_input
`);
            await pyodide.runPythonAsync(source);

            const actual = normalizeOutput(stdout);
            const expected = getExpectedOutput();
            if (stderr.trim()) {
                setStatus(result, 'error', 'اكتمل التشغيل مع رسائل خطأ', stderr.trim());
            } else if (expected && actual === expected) {
                setStatus(result, 'success', 'نجحت المحاولة واجتازت المخرجات المتوقعة', actual || 'تم التنفيذ بدون مخرجات.');
                const completeButton = document.getElementById('complete-btn');
                if (completeButton && completeButton.textContent.includes('تم الإنجاز')) completeButton.click();
            } else if (expected) {
                setStatus(result, 'error', 'المحاولة تعمل، لكن الناتج لا يطابق المتوقع', `الناتج الفعلي:\n${actual || '(فارغ)'}\n\nالناتج المتوقع:\n${expected}`);
            } else {
                setStatus(result, 'success', 'تم تشغيل الكود بنجاح', actual || 'تم التنفيذ بدون مخرجات.');
            }
        } catch (error) {
            engineState.textContent = 'المحرك جاهز للمحاولة مجددًا';
            setStatus(result, 'error', 'تعذر تنفيذ الكود', String(error?.message || error));
        } finally {
            runButton.disabled = false;
        }
    });

    document.getElementById('runner-reset').addEventListener('click', () => {
        code.value = initialCode;
        stdin.value = '';
        setStatus(result, 'idle', 'تمت إعادة المحرر. اكتب محاولة جديدة.');
        code.focus();
    });

    const steps = [...document.querySelectorAll('#q-reveals li')].map(item => item.textContent.trim()).filter(Boolean);
    document.querySelectorAll('[data-runner-hint]').forEach(button => {
        button.addEventListener('click', () => {
            const level = Number(button.dataset.runnerHint);
            const hint = document.getElementById('runner-hint');
            const fallback = level === 1
                ? 'قسّم المطلوب إلى خطوات صغيرة، وحدد المدخلات ثم الناتج المطلوب.'
                : 'قارن كل سطر من ناتجك بالمخرجات المتوقعة وراجع نوع البيانات والتحويلات.';
            hint.textContent = steps[level - 1] || fallback;
            hint.hidden = false;
        });
    });
}

const observer = new MutationObserver(() => {
    if (document.getElementById('q-prompt')) {
        buildRunner();
        observer.disconnect();
    }
});

observer.observe(document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', buildRunner);