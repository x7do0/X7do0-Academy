import i18n from './i18n.js';
import { lessons } from '../../data/python-lessons.js';

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    if (document.body.dataset.page !== 'python') return;

    const lessonList = document.getElementById('lesson-list');
    const lessonViewer = document.getElementById('lesson-viewer');
    const topicsGrid = document.getElementById('course-topics-grid');
    const siteUrl = 'https://x7do0.github.io/X7do0-Academy';
    let activeLesson = null;
    let activeFileType = 'subject';
    let fileRequest = 0;

    const escapeHtml = value => String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const normalizeNote = note => typeof note === 'object' ? note?.text : note;

    const itemLabel = item => item?.label || item?.text || (item?.type === 'group' ? 'أمثلة مرتبطة' : 'مثال برمجي');

    function updateLessonMetadata(lesson) {
        const title = `${lesson.title} | أكاديمية X7do0`;
        const description = `درس ${lesson.title} من مسار أساسيات بايثون في أكاديمية X7do0.`;
        const canonical = `${siteUrl}/courses/python/index.html#lesson-${lesson.id}`;
        document.title = title;
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    }

    function renderExample(item) {
        const label = escapeHtml(item.label || item.text || '');
        const note = escapeHtml(normalizeNote(item.note) || item.explanation || '');
        const code = escapeHtml(item.code || '');

        if (item.type === 'alert' || item.type === 'text') {
            return `<div class="lesson-note">${item.icon ? `<i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>` : ''}<span>${escapeHtml(item.text || '')}</span></div>`;
        }

        if (item.type === 'module-box') {
            const lines = (item.content || []).map(line => `
                <li>
                    <code dir="ltr">${escapeHtml(line.code)}</code>
                    ${line.comment ? `<span>${escapeHtml(line.comment)}</span>` : ''}
                </li>`).join('');
            return `
                <section class="lesson-example">
                    <h4>${label}</h4>
                    <ul class="lesson-module-list">${lines}</ul>
                </section>`;
        }

        if (item.type === 'group') {
            return `<div class="lesson-example-group">${(item.items || []).map(renderExample).join('')}</div>`;
        }

        if (item.type === 'container') {
            return `<div class="lesson-example-group">${(item.items || [])
                .filter(child => child.type !== 'divider')
                .map(child => renderExample({ ...child, type: 'keyword' }))
                .join('')}</div>`;
        }

        return `
            <section class="lesson-example">
                ${label ? `<h4>${label}</h4>` : ''}
                ${code ? `<pre><code class="language-python" dir="ltr">${code}</code></pre>` : ''}
                ${note ? `<p>${note}</p>` : ''}
            </section>`;
    }

    function renderLesson(lesson) {
        activeLesson = lesson;
        activeFileType = 'subject';
        updateLessonMetadata(lesson);

        lessonViewer.innerHTML = `
            <article class="lesson-document">
                <span class="lesson-document__eyebrow">الدرس ${escapeHtml(lesson.id)}</span>
                <h2>${escapeHtml(lesson.title)}</h2>
                <p class="lesson-document__summary">شرح عملي مختصر يوضح الفكرة بأمثلة مباشرة يمكنك مراجعتها وتطبيقها.</p>
                <section class="lesson-section">
                    <h3>الأمثلة الأساسية</h3>
                    <div class="lesson-examples">${(lesson.items || []).map(renderExample).join('')}</div>
                </section>
                ${lesson.extraInfo?.text ? `
                    <section class="lesson-section">
                        <h3>معلومة مهمة</h3>
                        <div class="lesson-note"><i class="${escapeHtml(lesson.extraInfo.icon || 'fas fa-info-circle')}" aria-hidden="true"></i><span>${escapeHtml(lesson.extraInfo.text)}</span></div>
                    </section>` : ''}
            </article>
            ${lesson.files ? `
                <section class="file-viewer" aria-labelledby="lesson-files-title">
                    <div class="file-viewer__header">
                        <div class="file-viewer__tabs" role="tablist" aria-label="ملفات الدرس">
                            <button type="button" class="file-viewer__tab active" role="tab" aria-selected="true" data-file-type="subject">ملف الموضوع</button>
                            <button type="button" class="file-viewer__tab" role="tab" aria-selected="false" data-file-type="challenge">ملف التحدي</button>
                        </div>
                        <a class="file-viewer__download" id="lesson-file-download" href="${escapeHtml(lesson.files.subject)}" download>
                            <i class="fas fa-download" aria-hidden="true"></i>
                            تنزيل الملف
                        </a>
                    </div>
                    <h3 id="lesson-files-title" class="sr-only">عرض ملفات الدرس</h3>
                    <div id="lesson-file-content" class="file-viewer__status" aria-live="polite">جاري فتح الملف...</div>
                </section>` : ''}
        `;

        lessonList.querySelectorAll('.lesson-list-link').forEach(link => {
            const selected = link.dataset.lessonId === lesson.id;
            link.classList.toggle('active', selected);
            link.setAttribute('aria-current', selected ? 'page' : 'false');
        });
        topicsGrid?.querySelectorAll('.course-topic-card').forEach(card => {
            const selected = card.dataset.lessonId === lesson.id;
            card.classList.toggle('active', selected);
            card.setAttribute('aria-pressed', String(selected));
        });

        lessonViewer.querySelectorAll('pre code').forEach(code => window.hljs?.highlightElement(code));
        lessonViewer.querySelectorAll('[data-file-type]').forEach(button => {
            button.addEventListener('click', () => selectFile(button.dataset.fileType));
        });

        if (lesson.files) loadLessonFile(lesson.files.subject);
    }

    async function loadLessonFile(path) {
        const content = document.getElementById('lesson-file-content');
        if (!content) return;

        const requestId = ++fileRequest;
        content.className = 'file-viewer__status';
        content.textContent = 'جاري فتح الملف...';

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const source = await response.text();
            if (requestId !== fileRequest) return;
            content.className = '';
            content.innerHTML = `<pre><code class="language-python" dir="ltr">${escapeHtml(source)}</code></pre>`;
            const code = content.querySelector('code');
            if (code) window.hljs?.highlightElement(code);
        } catch {
            if (requestId !== fileRequest) return;
            content.className = 'file-viewer__status';
            content.textContent = 'تعذر عرض الملف الآن، ويمكنك تنزيله مباشرة.';
        }
    }

    function selectFile(type) {
        if (!activeLesson?.files?.[type]) return;
        activeFileType = type;
        const path = activeLesson.files[type];
        lessonViewer.querySelectorAll('[data-file-type]').forEach(button => {
            const selected = button.dataset.fileType === activeFileType;
            button.classList.toggle('active', selected);
            button.setAttribute('aria-selected', String(selected));
        });
        const download = document.getElementById('lesson-file-download');
        if (download) download.href = path;
        loadLessonFile(path);
    }

    function selectLesson(lesson, options = {}) {
        renderLesson(lesson);
        if (options.updateHash !== false) {
            history.replaceState(null, '', `#lesson-${lesson.id}`);
        }
        if (options.scroll) {
            document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function renderLessonList() {
        if (!lessonList || !lessonViewer) return;
        lessonList.innerHTML = lessons.map(lesson => `
            <a href="#lesson-${escapeHtml(lesson.id)}" class="lesson-list-link" data-lesson-id="${escapeHtml(lesson.id)}">
                <span class="lesson-list-link__number">${escapeHtml(lesson.id)}</span>
                <span>${escapeHtml(lesson.title)}</span>
            </a>`).join('');

        lessonList.addEventListener('click', event => {
            const link = event.target.closest('[data-lesson-id]');
            if (!link) return;
            event.preventDefault();
            const lesson = lessons.find(item => item.id === link.dataset.lessonId);
            if (lesson) selectLesson(lesson, { scroll: true });
        });

        if (topicsGrid) {
            topicsGrid.innerHTML = lessons.map(lesson => `
                <button type="button" class="course-topic-card" data-lesson-id="${escapeHtml(lesson.id)}" aria-pressed="false">
                    <span class="course-topic-card__header">
                        <span class="course-topic-card__number">${escapeHtml(lesson.id)}</span>
                        <span class="course-topic-card__action">عرض التفاصيل <i class="fas fa-arrow-down" aria-hidden="true"></i></span>
                    </span>
                    <h3>${escapeHtml(lesson.title)}</h3>
                    <ul>
                        ${(lesson.items || []).slice(0, 5).map(item => `<li>${escapeHtml(itemLabel(item))}</li>`).join('')}
                    </ul>
                </button>`).join('');

            topicsGrid.addEventListener('click', event => {
                const card = event.target.closest('[data-lesson-id]');
                if (!card) return;
                const lesson = lessons.find(item => item.id === card.dataset.lessonId);
                if (lesson) selectLesson(lesson, { scroll: true });
            });
        }

        const hashId = window.location.hash.match(/^#lesson-(\d+)$/)?.[1];
        selectLesson(lessons.find(lesson => lesson.id === hashId) || lessons[0], { updateHash: Boolean(hashId) });
    }

    renderLessonList();
});
