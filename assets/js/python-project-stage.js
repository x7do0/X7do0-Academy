import { finalProject } from '../../data/python-final-project.js';
import { escapeHtml } from './content-format.js';

const PYODIDE_VERSION = '0.27.7';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const STORAGE_KEY = 'academy_final_project:python';
let pyodidePromise = null;

function normalizeOutput(value = '') {
    return String(value).replace(/\r\n/g, '\n').trim().split('\n').map(line => line.trimEnd()).join('\n');
}

function loadPyodideRuntime() {
    if (pyodidePromise) return pyodidePromise;

    pyodidePromise = new Promise((resolve, reject) => {
        const finish = () => window.loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve, reject);
        if (window.loadPyodide) {
            finish();
            return;
        }

        const script = document.createElement('script');
        script.src = `${PYODIDE_BASE}pyodide.js`;
        script.async = true;
        script.addEventListener('load', finish, { once: true });
        script.addEventListener('error', () => reject(new Error('تعذر تحميل محرك Python.')), { once: true });
        document.head.appendChild(script);
    }).catch(error => {
        pyodidePromise = null;
        throw error;
    });

    return pyodidePromise;
}

function markStageCompleted(stageId) {
    let completed = [];
    try {
        completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        completed = [];
    }
    if (!completed.includes(stageId)) {
        completed.push(stageId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    }
}

function renderError(message) {
    const mount = document.getElementById('project-stage');
    if (!mount) return;
    mount.innerHTML = `
        <div class="academic-card p-8 text-center">
            <h1 class="text-2xl font-bold text-academic-primary mb-3">تعذّر فتح المرحلة</h1>
            <p class="text-academic-secondary">${escapeHtml(message)}</p>
            <a href="./index.html" class="btn-accent inline-block mt-6 px-6 py-2 rounded-lg">العودة إلى المشروع</a>
        </div>`;
}

function renderStage() {
    const stageId = new URLSearchParams(window.location.search).get('id');
    const stage = finalProject.stages.find(item => item.id === stageId);
    const mount = document.getElementById('project-stage');
    if (!mount) return;
    if (!stage) {
        renderError('رقم المرحلة غير موجود.');
        return;
    }

    const stageIndex = finalProject.stages.indexOf(stage);
    const previous = finalProject.stages[stageIndex - 1];
    const next = finalProject.stages[stageIndex + 1];

    mount.innerHTML = `
        <header class="project-hero mb-6">
            <div class="flex items-center gap-3 mb-4">
                <span class="project-stage-number">${stage.number}</span>
                <span class="text-sm font-bold text-academic-accent">المرحلة ${stage.number} من ${finalProject.stages.length}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-academic-primary mb-4">${escapeHtml(stage.title)}</h1>
            <p class="text-academic-secondary leading-relaxed">${escapeHtml(stage.goal)}</p>
        </header>

        <section class="project-info-grid mb-6">
            <div class="project-info-panel">
                <h2 class="font-bold text-academic-primary mb-3"><i class="fas fa-list-check me-2 text-academic-accent"></i>ما الذي سنبنيه؟</h2>
                <ul class="space-y-2 text-sm text-academic-secondary">
                    ${stage.explanation.map(item => `<li class="flex gap-2"><i class="fas fa-circle text-[6px] mt-2 text-academic-accent"></i><span>${escapeHtml(item)}</span></li>`).join('')}
                </ul>
            </div>
            <div class="project-info-panel">
                <h2 class="font-bold text-academic-primary mb-3"><i class="fas fa-bullseye me-2 text-academic-accent"></i>الناتج المطلوب</h2>
                <p class="text-sm text-academic-secondary leading-relaxed">${escapeHtml(stage.expected)}</p>
                <h3 class="font-bold text-academic-primary mt-5 mb-2"><i class="fas fa-check-circle me-2 text-green-500"></i>معيار الإكمال</h3>
                <p class="text-sm text-academic-secondary leading-relaxed">${escapeHtml(stage.completion)}</p>
            </div>
        </section>

        <section class="project-info-panel mb-6">
            <details>
                <summary class="font-bold text-academic-primary cursor-pointer">إظهار التلميح البرمجي</summary>
                <p class="text-sm text-academic-secondary mt-3 leading-relaxed">${escapeHtml(stage.hint)}</p>
            </details>
        </section>

        <section class="project-runner mb-6">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                    <h2 class="font-bold text-white">مساحة تنفيذ المرحلة</h2>
                    <p class="text-xs text-slate-400 mt-1">عدّل الكود وشغّله. تُسجّل المرحلة تلقائياً عند مطابقة الناتج.</p>
                </div>
                <button id="project-reset" type="button" class="project-secondary-button"><i class="fas fa-rotate-left me-2"></i>إعادة الكود</button>
            </div>
            <textarea id="project-code" class="project-code-editor" dir="ltr" spellcheck="false" aria-label="محرر كود المرحلة">${escapeHtml(stage.code)}</textarea>
            <div class="flex flex-wrap gap-3 mt-3">
                <button id="project-run" type="button" class="btn-accent px-6 py-2.5 rounded-lg font-bold"><i class="fas fa-play me-2"></i>تشغيل الكود</button>
            </div>
            <pre id="project-output" class="project-runner-output" aria-label="مخرجات الكود">ستظهر المخرجات هنا.</pre>
            <div id="project-result" class="project-result" hidden role="status" aria-live="polite"></div>
        </section>

        <nav class="grid grid-cols-2 gap-3">
            ${previous
                ? `<a href="./stage.html?id=${previous.id}" class="academic-card p-4 font-bold text-academic-primary">السابق: ${escapeHtml(previous.title)}</a>`
                : '<a href="./index.html" class="academic-card p-4 font-bold text-academic-primary">نظرة عامة</a>'}
            ${next
                ? `<a href="./stage.html?id=${next.id}" class="academic-card p-4 font-bold text-academic-primary text-end">التالي: ${escapeHtml(next.title)}</a>`
                : '<a href="./summary.html" class="btn-accent p-4 font-bold text-end rounded-lg">عرض الملخص النهائي</a>'}
        </nav>`;

    const editor = document.getElementById('project-code');
    const output = document.getElementById('project-output');
    const result = document.getElementById('project-result');
    const runButton = document.getElementById('project-run');

    document.getElementById('project-reset')?.addEventListener('click', () => {
        editor.value = stage.code;
        output.textContent = 'ستظهر المخرجات هنا.';
        result.hidden = true;
        editor.focus();
    });

    runButton?.addEventListener('click', async () => {
        runButton.disabled = true;
        result.hidden = true;
        output.textContent = 'جاري تشغيل الكود...';

        try {
            const pyodide = await loadPyodideRuntime();
            let stdout = '';
            let stderr = '';
            pyodide.setStdout({ batched: value => { stdout += `${value}\n`; } });
            pyodide.setStderr({ batched: value => { stderr += `${value}\n`; } });
            await pyodide.runPythonAsync(editor.value);

            const actual = normalizeOutput(stdout);
            output.textContent = actual || '(لا توجد مخرجات)';
            const isMatch = !stderr.trim() && actual === normalizeOutput(stage.expectedOutput);
            result.className = `project-result ${isMatch ? 'project-result--success' : 'project-result--error'}`;
            result.textContent = isMatch ? 'أحسنت! اكتملت هذه المرحلة.' : 'الناتج غير مطابق بعد. راجع المطلوب وحاول مرة أخرى.';
            result.hidden = false;
            if (isMatch) markStageCompleted(stage.id);
        } catch (error) {
            console.error('[PythonFinalProject]', error);
            output.textContent = error?.message || String(error);
            result.className = 'project-result project-result--error';
            result.textContent = 'تعذر تشغيل الكود. راجع الصياغة وحاول مرة أخرى.';
            result.hidden = false;
        } finally {
            runButton.disabled = false;
        }
    });
}

renderStage();
