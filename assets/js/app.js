import i18n from './i18n.js';
import { lessons } from '../../data/python-lessons.js';
import { getLessonPresentation } from './content-presentation.js';
import { enhanceCodeWindows, escapeHtml, renderCodeWindow } from './code-experience.js';

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    if (document.body.dataset.page !== 'python') return;

    const lessonGrid = document.getElementById('lesson-grid');
    const popover = document.getElementById('code-preview-popover');
    const popoverContent = document.getElementById('code-preview-content');
    let hideTimer;

    const accentColors = {
        blue: '#4f7df3',
        purple: '#8b5cf6',
        green: '#22c55e',
        pink: '#ec4899',
        indigo: '#6366f1',
        yellow: '#eab308'
    };

    const fallbackCode = item => {
        const label = item?.label || '';
        if (label === 'str()') return 'text = str(100)\nprint(text)';
        if (label === 'int()') return 'number = int("25")\nprint(number)';
        if (label === 'float()') return 'price = float("19.5")\nprint(price)';
        return item?.code || '';
    };

    const codeAttribute = code => encodeURIComponent(code || '');

    function conceptButton(item, extraClass = '') {
        const code = fallbackCode(item);
        if (!code) return '';
        const note = typeof item.note === 'object' ? item.note?.text : item.note;
        return `
            <button type="button" class="concept-point ${extraClass}" data-code="${codeAttribute(code)}" aria-expanded="false">
                <span>${escapeHtml(item.label || 'مثال برمجي')}</span>
                ${note ? `<small>${escapeHtml(note)}</small>` : ''}
            </button>`;
    }

    function renderItem(item) {
        if (!item?.type) return '';

        if (['keyword', 'compound', 'code-box', 'logic-row', 'method', 'pill', 'pill-box', 'code-link'].includes(item.type)) {
            return conceptButton(item);
        }

        if (item.type === 'group') {
            return `<div class="concept-point-group">${(item.items || []).map(renderItem).join('')}</div>`;
        }

        if (item.type === 'container') {
            return `<div class="concept-point-stack">${(item.items || []).filter(child => child.type !== 'divider').map(renderItem).join('')}</div>`;
        }

        if (item.type === 'module-box') {
            return `
                <section class="concept-module">
                    <h4>${escapeHtml(item.label)}</h4>
                    <div class="concept-point-stack">
                        ${(item.content || []).map(line => conceptButton({
                            label: line.comment ? `${line.code} — ${line.comment.replace(/^#\s*/, '')}` : line.code,
                            code: line.code
                        })).join('')}
                    </div>
                </section>`;
        }

        if (item.type === 'alert') {
            return `<div class="concept-note concept-note--${escapeHtml(item.color || 'blue')}">${item.icon ? `<i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>` : ''}<span>${escapeHtml(item.text)}</span></div>`;
        }

        if (item.type === 'text') {
            return `<p class="concept-intro">${escapeHtml(item.text)}</p>`;
        }

        return '';
    }

    function showCodePreview(element) {
        const code = decodeURIComponent(element.dataset.code || '').replace(/\\n/g, '\n');
        if (!code || !popover || !popoverContent) return;
        const label = element.querySelector(':scope > span')?.textContent?.trim() || 'معاينة الكود';
        popoverContent.innerHTML = renderCodeWindow({
            code,
            label,
            filename: 'example.py',
            compact: true
        });
        enhanceCodeWindows(popoverContent);
        popover.classList.add('is-visible');
        popover.setAttribute('aria-hidden', 'false');
        clearTimeout(hideTimer);
    }

    function hideCodePreview(delay = 180) {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            popover?.classList.remove('is-visible');
            popover?.setAttribute('aria-hidden', 'true');
        }, delay);
    }

    function toggleMobilePreview(element) {
        const existing = element.nextElementSibling?.classList.contains('mobile-programming-preview')
            ? element.nextElementSibling
            : null;

        document.querySelectorAll('.mobile-programming-preview').forEach(preview => {
            if (preview !== existing) {
                preview.previousElementSibling?.setAttribute('aria-expanded', 'false');
                preview.remove();
            }
        });

        if (existing) {
            existing.remove();
            element.setAttribute('aria-expanded', 'false');
            return;
        }

        const code = decodeURIComponent(element.dataset.code || '').replace(/\\n/g, '\n');
        const label = element.querySelector(':scope > span')?.textContent?.trim() || 'معاينة الكود';
        const preview = document.createElement('div');
        preview.className = 'mobile-programming-preview';
        preview.innerHTML = renderCodeWindow({ code, label, filename: 'example.py', compact: true });
        element.insertAdjacentElement('afterend', preview);
        element.setAttribute('aria-expanded', 'true');
        enhanceCodeWindows(preview);
    }

    function bindInteractions() {
        const mobileQuery = window.matchMedia('(max-width: 767px), (hover: none)');

        lessonGrid.querySelectorAll('[data-code]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!mobileQuery.matches) showCodePreview(element);
            });
            element.addEventListener('mouseleave', () => {
                if (!mobileQuery.matches) hideCodePreview();
            });
            element.addEventListener('focus', () => {
                if (!mobileQuery.matches) showCodePreview(element);
            });
            element.addEventListener('blur', () => {
                if (!mobileQuery.matches) hideCodePreview();
            });
            element.addEventListener('click', () => {
                if (mobileQuery.matches) toggleMobilePreview(element);
                else showCodePreview(element);
            });
        });

        popover?.addEventListener('mouseenter', () => clearTimeout(hideTimer));
        popover?.addEventListener('mouseleave', () => hideCodePreview(120));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') hideCodePreview(0);
        });
    }

    function renderCards() {
        if (!lessonGrid) return;

        lessonGrid.innerHTML = lessons.map(lesson => {
            const presentation = getLessonPresentation(lesson.id);
            const accent = accentColors[presentation.color] || accentColors.blue;
            return `
                <article class="concept-card" style="--concept-accent:${accent}">
                    <header class="concept-card__header">
                        <span class="concept-card__icon"><i class="${escapeHtml(presentation.icon)}" aria-hidden="true"></i></span>
                        <div class="concept-card__heading">
                            <span class="concept-card__eyebrow">${escapeHtml(lesson.id)}</span>
                            <h2>${escapeHtml(lesson.title)}</h2>
                        </div>
                    </header>
                    <div class="concept-card__body">
                        ${(lesson.items || []).map(renderItem).join('')}
                        ${lesson.extraInfo?.text ? `<div class="concept-note"><i class="${escapeHtml(lesson.extraInfo.icon || 'fas fa-info-circle')}" aria-hidden="true"></i><span>${escapeHtml(lesson.extraInfo.text)}</span></div>` : ''}
                    </div>
                    <a href="./lessons/index.html#lesson-${escapeHtml(lesson.id)}" class="concept-card__lesson-link">
                        <span>فتح الشرح التفصيلي</span>
                        <i class="fas fa-arrow-left" aria-hidden="true"></i>
                    </a>
                </article>`;
        }).join('');

        bindInteractions();
    }

    renderCards();
});
