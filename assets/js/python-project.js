import { finalProject } from '../../data/python-final-project.js';
import { escapeHtml } from './content-format.js';

const STORAGE_KEY = 'academy_final_project:python';

function getCompletedStages() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function renderOverview() {
    const mount = document.getElementById('project-overview');
    if (!mount) return;

    const completed = getCompletedStages();
    const percentage = Math.round((completed.length / finalProject.stages.length) * 100);

    mount.innerHTML = `
        <section class="project-hero mb-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div class="max-w-2xl">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="project-stage-number"><i class="fas fa-flag-checkered" aria-hidden="true"></i></span>
                        <span class="text-sm font-bold text-academic-accent">المشروع الختامي لمسار Python</span>
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-academic-primary mb-4">${escapeHtml(finalProject.title)}</h1>
                    <p class="text-academic-secondary leading-relaxed">${escapeHtml(finalProject.summary)}</p>
                </div>
                <div class="min-w-[180px] p-4 rounded-xl text-center" style="background:var(--accent-soft);border:1px solid var(--border-accent);">
                    <div class="text-3xl font-bold text-academic-accent">${percentage}%</div>
                    <div class="text-xs text-academic-secondary mt-1">${completed.length} من ${finalProject.stages.length} مراحل</div>
                </div>
            </div>
            <div class="flex flex-wrap gap-3 mt-6">
                <a href="./stage.html?id=${finalProject.stages[0].id}" class="btn-accent px-6 py-3 rounded-lg font-bold">
                    ابدأ المشروع <i class="fas fa-arrow-left ms-2" aria-hidden="true"></i>
                </a>
                <a href="../../../files/python/final-project/task-manager-starter.py" download class="project-secondary-button">
                    <i class="fas fa-download me-2" aria-hidden="true"></i>تنزيل ملف البداية
                </a>
            </div>
        </section>

        <section class="academic-card p-5 mb-8">
            <h2 class="text-lg font-bold text-academic-primary mb-3">دروس تساعدك قبل البدء</h2>
            <div class="flex flex-wrap gap-2">
                <a href="../index.html#lesson-09" class="project-secondary-button">الدوال المخصصة</a>
                <a href="../index.html#lesson-11" class="project-secondary-button">القوائم</a>
                <a href="../index.html#lesson-12" class="project-secondary-button">القواميس</a>
            </div>
        </section>

        <section>
            <div class="flex items-end justify-between gap-4 mb-5">
                <div>
                    <h2 class="text-2xl font-bold text-academic-primary">مراحل البناء</h2>
                    <p class="text-sm text-academic-secondary mt-1">ابنِ المنتج خطوة بخطوة، وشغّل كود كل مرحلة داخل المتصفح.</p>
                </div>
                <a href="./summary.html" class="text-sm font-bold text-academic-accent">ملخص المشروع</a>
            </div>
            <div class="project-stage-list">
                ${finalProject.stages.map(stage => {
                    const isComplete = completed.includes(stage.id);
                    return `
                        <a href="./stage.html?id=${stage.id}" class="project-stage-card ${isComplete ? 'is-complete' : ''}">
                            <div class="flex items-center justify-between">
                                <span class="project-stage-number">${isComplete ? '<i class="fas fa-check"></i>' : stage.number}</span>
                                <i class="fas fa-arrow-left text-academic-muted" aria-hidden="true"></i>
                            </div>
                            <h3 class="text-lg font-bold text-academic-primary">${escapeHtml(stage.title)}</h3>
                            <p class="text-sm text-academic-secondary leading-relaxed">${escapeHtml(stage.goal)}</p>
                            <span class="mt-auto text-xs font-bold ${isComplete ? 'text-green-500' : 'text-academic-accent'}">${isComplete ? 'مكتملة' : 'ابدأ المرحلة'}</span>
                        </a>`;
                }).join('')}
            </div>
        </section>`;
}

renderOverview();
