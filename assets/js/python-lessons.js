import i18n from './i18n.js';
import { lessons } from '../../data/python-lessons.js';
import { enhanceCodeWindows, escapeHtml, renderCodeWindow } from './code-experience.js';

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    if (document.body.dataset.page !== 'python-lessons') return;

    const lessonList = document.getElementById('lesson-list');
    const lessonViewer = document.getElementById('lesson-viewer');
    const siteUrl = 'https://x7do0.github.io/X7do0-Academy';
    let activeLesson = null;
    let activeFileType = 'subject';
    let fileRequest = 0;

    const normalizeNote = note => typeof note === 'object' ? note?.text : note;
    const lessonFilePath = path => path?.replace('../../files/', '../../../files/');
    const normalizeLessonSource = source => source.replace(/#(?:w|y|g|o|r|b|c|p|m)\s?/gi, '# ');

    function updateLessonMetadata(lesson) {
        const title = `${lesson.title} | أكاديمية X7do0`;
        const description = `درس ${lesson.title} من مسار أساسيات بايثون في أكاديمية X7do0.`;
        const canonical = `${siteUrl}/courses/python/lessons/index.html#lesson-${lesson.id}`;
        document.title = title;
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    }

    function fallbackCode(item) {
        if (item?.code) return item.code;
        if (item?.label === 'str()') return 'text = str(100)\nprint(text)';
        if (item?.label === 'int()') return 'number = int("25")\nprint(number)';
        if (item?.label === 'float()') return 'price = float("19.5")\nprint(price)';
        return '';
    }

    function renderExample(item) {
        const label = item.label || item.text || 'مثال برمجي';
        const note = normalizeNote(item.note) || item.explanation || '';
        const code = fallbackCode(item);

        if (item.type === 'alert' || item.type === 'text') {
            return `<div class="lesson-note">${item.icon ? `<i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>` : ''}<span>${escapeHtml(item.text || '')}</span></div>`;
        }

        if (item.type === 'module-box') {
            const moduleCode = (item.content || [])
                .map(line => `${line.code}${line.comment ? `  ${line.comment}` : ''}`)
                .join('\n');
            return `
                <section class="lesson-example">
                    <h4>${escapeHtml(label)}</h4>
                    ${renderCodeWindow({ code: moduleCode, label, filename: 'module_examples.py' })}
                </section>`;
        }

        if (item.type === 'group') {
            return `<div class="lesson-example-group">${(item.items || []).map(renderExample).join('')}</div>`;
        }

        if (item.type === 'container') {
            return `<div class="lesson-example-group">${(item.items || [])
                .filter(child => child.type !== 'divider')
                .map(child => renderExample(child))
                .join('')}</div>`;
        }

        return `
            <section class="lesson-example">
                <h4>${escapeHtml(label)}</h4>
                ${code ? renderCodeWindow({ code, label, filename: 'example.py' }) : ''}
                ${note ? `<p>${escapeHtml(note)}</p>` : ''}
            </section>`;
    }

    function renderLesson(lesson) {
        activeLesson = lesson;
        activeFileType = 'subject';
        updateLessonMetadata(lesson);

        const subjectPath = lessonFilePath(lesson.files?.subject);
        lessonViewer.innerHTML = `
            <article class="lesson-document">
                <span class="lesson-document__eyebrow">الدرس ${escapeHtml(lesson.id)}</span>
                <h2>${escapeHtml(lesson.title)}</h2>
                <p class="lesson-document__summary">شرح عملي يوضح الفكرة بأمثلة برمجية قابلة للقراءة والنسخ.</p>
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
                        <a class="file-viewer__download" id="lesson-file-download" href="${escapeHtml(subjectPath)}" download>
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

        enhanceCodeWindows(lessonViewer);
        lessonViewer.querySelectorAll('[data-file-type]').forEach(button => {
            button.addEventListener('click', () => selectFile(button.dataset.fileType));
        });

        if (subjectPath) loadLessonFile(subjectPath, 'subject.py');
    }

    async function loadLessonFile(path, filename) {
        const content = document.getElementById('lesson-file-content');
        if (!content) return;

        const requestId = ++fileRequest;
        content.className = 'file-viewer__status';
        content.textContent = 'جاري فتح الملف...';

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const source = normalizeLessonSource(await response.text());
            if (requestId !== fileRequest) return;
            content.className = 'file-viewer__code';
            content.innerHTML = renderCodeWindow({
                code: source,
                label: activeFileType === 'subject' ? 'ملف الموضوع' : 'ملف التحدي',
                filename
            });
            enhanceCodeWindows(content);
        } catch {
            if (requestId !== fileRequest) return;
            content.className = 'file-viewer__status';
            content.textContent = 'تعذر عرض الملف الآن، ويمكنك تنزيله مباشرة.';
        }
    }

    function selectFile(type) {
        const originalPath = activeLesson?.files?.[type];
        if (!originalPath) return;
        activeFileType = type;
        const path = lessonFilePath(originalPath);
        lessonViewer.querySelectorAll('[data-file-type]').forEach(button => {
            const selected = button.dataset.fileType === activeFileType;
            button.classList.toggle('active', selected);
            button.setAttribute('aria-selected', String(selected));
        });
        const download = document.getElementById('lesson-file-download');
        if (download) download.href = path;
        loadLessonFile(path, type === 'subject' ? 'subject.py' : 'challenge.py');
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

        const hashId = window.location.hash.match(/^#lesson-(\d+)$/)?.[1];
        selectLesson(lessons.find(lesson => lesson.id === hashId) || lessons[0], { updateHash: Boolean(hashId) });
    }

    renderLessonList();
});
