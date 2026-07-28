import { finalProject } from '../../data/python-final-project.js';
import { escapeHtml } from './content-format.js';

function renderError(message) {
    const mount = document.getElementById('project-stage');
    if (!mount) return;
    mount.innerHTML = `
        <section class="project-empty">
            <i class="far fa-folder-open" aria-hidden="true"></i>
            <h1>تعذر فتح المرحلة</h1>
            <p>${escapeHtml(message)}</p>
            <a href="./index.html">العودة إلى المشاريع</a>
        </section>`;
}

function renderStage() {
    const stageId = new URLSearchParams(window.location.search).get('id');
    const stage = finalProject.stages.find(item => item.id === stageId);
    const mount = document.getElementById('project-stage');
    if (!mount) return;
    if (!stage) {
        renderError('المرحلة المطلوبة غير موجودة.');
        return;
    }

    const stageIndex = finalProject.stages.indexOf(stage);
    const previous = finalProject.stages[stageIndex - 1];
    const next = finalProject.stages[stageIndex + 1];

    mount.innerHTML = `
        <div class="project-stage-layout">
            <aside class="project-stage-rail" aria-label="مراحل المشروع">
                <span class="project-stage-rail__label">مراحل المشروع</span>
                <nav>
                    ${finalProject.stages.map(item => `
                        <a href="./stage.html?id=${encodeURIComponent(item.id)}" class="${item.id === stage.id ? 'active' : ''}" ${item.id === stage.id ? 'aria-current="page"' : ''}>
                            <span>${item.number}</span>
                            <strong>${escapeHtml(item.title)}</strong>
                        </a>`).join('')}
                </nav>
            </aside>

            <section class="project-stage-detail">
                <header>
                    <span class="project-kicker">المرحلة ${stage.number} من ${finalProject.stages.length}</span>
                    <h1>${escapeHtml(stage.title)}</h1>
                    <p>${escapeHtml(stage.goal)}</p>
                </header>

                <section class="project-detail-block">
                    <h2><i class="fas fa-layer-group" aria-hidden="true"></i> ما الذي تتضمنه هذه المرحلة؟</h2>
                    <ul>
                        ${stage.explanation.map(item => `<li><span>${escapeHtml(item)}</span></li>`).join('')}
                    </ul>
                </section>

                <section class="project-detail-block project-detail-block--result">
                    <h2><i class="fas fa-bullseye" aria-hidden="true"></i> النتيجة المتوقعة</h2>
                    <p>${escapeHtml(stage.expected)}</p>
                </section>

                <nav class="project-stage-pager" aria-label="التنقل بين المراحل">
                    ${previous
                        ? `<a href="./stage.html?id=${encodeURIComponent(previous.id)}"><small>المرحلة السابقة</small><strong>${escapeHtml(previous.title)}</strong></a>`
                        : '<a href="./index.html"><small>المشاريع</small><strong>نظرة عامة</strong></a>'}
                    ${next
                        ? `<a href="./stage.html?id=${encodeURIComponent(next.id)}"><small>المرحلة التالية</small><strong>${escapeHtml(next.title)}</strong></a>`
                        : '<a href="./index.html"><small>اكتمل العرض</small><strong>العودة إلى المشروع</strong></a>'}
                </nav>
            </section>
        </div>`;
}

renderStage();
