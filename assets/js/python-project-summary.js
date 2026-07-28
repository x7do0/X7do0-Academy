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

function renderSummary() {
    const mount = document.getElementById('project-summary');
    if (!mount) return;

    const completed = getCompletedStages();
    const allCompleted = finalProject.stages.every(stage => completed.includes(stage.id));

    mount.innerHTML = `
        <section class="project-hero mb-6 text-center">
            <div class="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center text-2xl" style="background:${allCompleted ? 'var(--success-soft)' : 'var(--accent-soft)'};color:${allCompleted ? 'var(--success)' : 'var(--accent)'};">
                <i class="fas ${allCompleted ? 'fa-trophy' : 'fa-route'}" aria-hidden="true"></i>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-academic-primary mb-4">${allCompleted ? 'أنجزت المشروع الختامي' : 'ملخص المشروع الختامي'}</h1>
            <p class="text-academic-secondary max-w-2xl mx-auto leading-relaxed">
                ${allCompleted
                    ? `بنيت ${escapeHtml(finalProject.title)} عبر ست مراحل مترابطة، من تحديد المتطلبات إلى تحسين بنية الكود.`
                    : `أكملت ${completed.length} من ${finalProject.stages.length} مراحل. يمكنك مراجعة ما تعلمته ثم العودة لإكمال المراحل المتبقية.`}
            </p>
        </section>

        <section class="academic-card p-6 mb-6">
            <h2 class="text-2xl font-bold text-academic-primary mb-5">ما الذي بنيته؟</h2>
            <p class="text-academic-secondary leading-relaxed mb-5">${escapeHtml(finalProject.summary)}</p>
            <ul class="project-summary-list">
                ${finalProject.outcomes.map(item => `<li><i class="fas fa-check-circle text-green-500 mt-1"></i><span class="text-sm text-academic-secondary">${escapeHtml(item)}</span></li>`).join('')}
            </ul>
        </section>

        <div class="flex flex-wrap gap-3 justify-center">
            <a href="./index.html" class="btn-accent px-6 py-3 rounded-lg font-bold">العودة إلى مراحل المشروع</a>
            <a href="../../../files/python/final-project/task-manager-starter.py" download class="project-secondary-button"><i class="fas fa-download me-2"></i>تنزيل ملف البداية</a>
            <a href="../practice/index.html" class="project-secondary-button">مراجعة التمارين</a>
        </div>`;
}

renderSummary();
