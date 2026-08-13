import { lessons } from '../../data/cpp-lessons.js';
import { escapeHtml } from './code-experience.js';

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page !== 'cpp-practice') return;
    const container = document.getElementById('cpp-challenges');
    if (!container) return;
    const challengeLessons = lessons.filter(lesson => lesson.files?.challenge);
    container.innerHTML = challengeLessons.map(lesson => `
        <a href="../lessons/index.html#lesson-${escapeHtml(lesson.id)}" class="academic-card p-5 block transition-all hover:border-accent">
            <div class="flex items-center justify-between gap-3 mb-3">
                <span class="text-xs font-mono text-academic-muted">${escapeHtml(lesson.id)}</span>
                <i class="fas fa-code text-academic-accent" aria-hidden="true"></i>
            </div>
            <h2 class="font-bold text-academic-primary mb-2">${escapeHtml(lesson.title)}</h2>
            <p class="text-sm text-academic-secondary">افتح الدرس ثم انتقل إلى ملف التحدي وجرّب الحل بنفسك.</p>
        </a>`).join('');
});
