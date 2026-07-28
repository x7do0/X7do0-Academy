import { finalProject } from '../../data/python-final-project.js';
import { escapeHtml } from './content-format.js';

function renderOverview() {
    const mount = document.getElementById('project-overview');
    if (!mount) return;

    mount.innerHTML = `
        <section class="project-intro">
            <div class="project-intro__copy">
                <span class="project-kicker"><i class="far fa-folder-open" aria-hidden="true"></i> مشروع تطبيقي</span>
                <h2>${escapeHtml(finalProject.title)}</h2>
                <p>${escapeHtml(finalProject.summary)}</p>
            </div>
            <div class="project-facts" aria-label="معلومات المشروع">
                <span><strong>${finalProject.stages.length}</strong> مراحل</span>
                <span><strong>${finalProject.outcomes.length}</strong> أهداف تعليمية</span>
            </div>
        </section>

        <section class="project-section">
            <div class="project-section__heading">
                <div>
                    <span>خريطة البناء</span>
                    <h2>مراحل المشروع</h2>
                </div>
                <p>افتح أي مرحلة لفهم هدفها وما الذي تضيفه إلى المنتج النهائي.</p>
            </div>
            <ol class="project-stage-list">
                ${finalProject.stages.map(stage => `
                    <li>
                        <a href="./stage.html?id=${encodeURIComponent(stage.id)}" class="project-stage-card">
                            <span class="project-stage-number">${stage.number}</span>
                            <span class="project-stage-card__copy">
                                <strong>${escapeHtml(stage.title)}</strong>
                                <small>${escapeHtml(stage.goal)}</small>
                            </span>
                            <span class="project-stage-card__action">عرض المرحلة <i class="fas fa-arrow-left" aria-hidden="true"></i></span>
                        </a>
                    </li>`).join('')}
            </ol>
        </section>

        <section class="project-section project-outcomes">
            <div class="project-section__heading">
                <div>
                    <span>النتيجة التعليمية</span>
                    <h2>ما الذي يغطيه المشروع؟</h2>
                </div>
            </div>
            <ul>
                ${finalProject.outcomes.map(outcome => `<li><i class="fas fa-circle" aria-hidden="true"></i><span>${escapeHtml(outcome)}</span></li>`).join('')}
            </ul>
        </section>`;
}

renderOverview();
