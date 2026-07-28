import i18n from './i18n.js';
import { lessons } from '../../data/python-lessons.js';

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    if (document.body.dataset.page !== 'python') return;

    const mainContainer = document.getElementById('lesson-grid');
    const overlay = document.getElementById('code-overlay');
    const overlayContent = document.getElementById('overlay-content');
    let overlayTimeout;

    const keywordColorClass = color => ({
        green: 'keyword:green',
        purple: 'keyword:purple',
        pink: 'keyword:pink',
        indigo: 'keyword:indigo',
        orange: 'keyword:orange'
    })[color] || 'keyword\\:blue';

    const accentVar = color => color === 'blue'
        ? 'var(--accent)'
        : `var(--${color}-500, ${color})`;

    const codeAttribute = code => encodeURIComponent(code || '');

    function renderItem(item, lessonColor) {
        if (!item?.type) return '';

        const items = item.items || [];
        const content = item.content || [];
        const itemLabel = item.label || '';
        const blockStyle = `keyword p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer block w-full text-start ${keywordColorClass(lessonColor)}`;

        if (item.type === 'keyword') {
            const spanClass = item.span ? `col-span-${item.span}` : '';
            const alignClass = item.align === 'center' ? 'text-center' : 'text-start';
            return `<button type="button" class="${blockStyle} text-sm font-mono font-bold ${alignClass} ${spanClass}" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'compound') {
            const noteText = typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `
                <div class="space-y-2 w-full">
                    <button type="button" class="${blockStyle} text-sm font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>
                    <div class="arabic-text text-xs italic px-2 border-s-2 p-2 rounded" style="color:var(--text-secondary);border-color:var(--accent);background:var(--accent-soft);">${noteText}</div>
                </div>`;
        }

        if (item.type === 'alert') {
            const isDanger = item.color === 'red';
            const background = isDanger ? 'var(--danger-soft)' : 'var(--warning-soft)';
            const color = isDanger ? 'var(--danger)' : 'var(--warning)';
            return `<div class="arabic-text text-xs" style="color:${color};background:${background};padding:0.5rem;border-radius:0.5rem;border:1px solid ${color}20;display:flex;align-items:center;gap:0.5rem;">${item.icon ? `<i class="${item.icon}" style="color:${color}"></i>` : ''}${item.text}</div>`;
        }

        if (item.type === 'group') {
            return `<div class="flex flex-wrap gap-2 w-full">${items.map(subItem => renderItem(subItem, lessonColor)).join('')}</div>`;
        }

        if (item.type === 'pill' || item.type === 'pill-box') {
            return `<button type="button" class="${blockStyle} flex-1 text-center text-xs font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'code-box') {
            const noteText = typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `<button type="button" class="code-surface keyword p-3 group/code cursor-pointer w-full text-start" data-code="${codeAttribute(item.code)}"><span class="font-bold font-mono text-sm block">${itemLabel}</span>${noteText ? `<span class="arabic-text text-[10px] block" style="color:var(--text-muted);margin-top:0.5rem;">${noteText}</span>` : ''}</button>`;
        }

        if (item.type === 'container') {
            return `<div class="code-surface p-4 w-full">${items.map(subItem => {
                if (subItem.type === 'divider') {
                    return '<div class="my-2 border-t" style="border-color:var(--border-soft);"></div>';
                }
                return `<button type="button" class="${blockStyle} text-sm font-mono font-bold mb-2" data-code="${codeAttribute(subItem.code)}">${subItem.label || ''}</button>`;
            }).join('')}</div>`;
        }

        if (item.type === 'logic-row') {
            return `<button type="button" class="${blockStyle} flex justify-between items-center" data-code="${codeAttribute(item.code)}"><span class="font-bold font-mono text-sm">${itemLabel}</span><span class="arabic-text text-[10px] px-2 py-1 rounded border shadow-sm" style="color:var(--text-secondary);background:var(--bg-interactive);border-color:var(--border-soft);">${item.explanation}</span></button>`;
        }

        if (item.type === 'module-box') {
            return `<div class="code-surface p-4"><span class="font-mono font-bold text-sm block pb-2 mb-3" style="border-bottom:1px solid var(--accent);color:var(--accent);">${item.label}</span><div class="font-mono text-xs space-y-2 leading-relaxed font-semibold" style="color:var(--success);">${content.map(line => `<div class="${line.comment ? 'flex justify-between' : 'truncate'}">${line.code} ${line.comment ? `<span style="color:var(--text-muted);font-weight:400;">${line.comment}</span>` : ''}</div>`).join('')}</div></div>`;
        }

        if (item.type === 'method') {
            return `<button type="button" class="${blockStyle} text-xs font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'text') {
            return `<div class="arabic-text text-xs mb-4 italic flex items-center gap-2" style="color:var(--text-muted);"><div class="h-px w-4" style="background:var(--border);"></div>${item.text}</div>`;
        }

        return '';
    }

    function renderFiles(lesson) {
        if (!lesson.files) return '';

        const fileLink = (path, icon, label, filename) => path ? `
            <a href="${path}" download class="interactive-surface flex items-center justify-between p-2.5 transition-all duration-200 group/file">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded flex items-center justify-center" style="background:var(--accent-soft);color:var(--accent);"><i class="${icon}"></i></div>
                    <div class="text-start"><div class="text-xs font-mono" style="color:var(--text-primary);">${label}</div><div class="text-[10px]" style="color:var(--text-muted);">${filename}</div></div>
                </div>
                <i class="fas fa-download" style="color:var(--text-muted);"></i>
            </a>` : '';

        return `
            <div class="mt-5 pt-4 border-t" style="border-color:var(--border-soft);">
                <button class="w-full flex items-center justify-between group/toggle focus:outline-none toggle-btn" aria-expanded="false" style="cursor:pointer;">
                    <span class="text-[10px] font-bold tracking-widest uppercase" style="color:var(--text-muted);"><i class="fas fa-folder-open me-2"></i>${i18n.t('python.files_resources')}</span>
                    <i class="fas fa-chevron-down text-[10px] transition-transform duration-300 toggle-icon" style="color:var(--text-muted);"></i>
                </button>
                <div class="collapsible-content"><div class="space-y-2 pt-3">
                    ${fileLink(lesson.files.subject, 'far fa-file-code', i18n.t('python.lesson_code'), 'subject.py')}
                    ${fileLink(lesson.files.challenge, 'fas fa-tasks', i18n.t('python.challenge'), 'challenge.py')}
                </div></div>
            </div>`;
    }

    function renderLessonsGrid() {
        if (!mainContainer) return;
        mainContainer.innerHTML = '';

        lessons.forEach(lesson => {
            const color = lesson.color || 'blue';
            const card = document.createElement('section');
            card.className = `academic-card p-6 group ${lesson.span > 1 ? `md:col-span-${lesson.span}` : ''}`;
            card.style.borderLeft = `4px solid ${accentVar(color)}`;

            let contentBody = '';
            if (lesson.layout === 'grid') {
                contentBody = `<div class="grid grid-cols-2 gap-3">${lesson.items.map(item => renderItem(item, color)).join('')}</div>`;
            } else if (lesson.layout === 'grid-column' && lesson.columns) {
                contentBody = `<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">${lesson.columns.map(column => `<div class="space-y-4">${column.map(item => renderItem(item, color)).join('')}</div>`).join('')}</div>`;
            } else {
                contentBody = `<ul class="space-y-3">${(lesson.items || []).map(item => item.type === 'group' || item.type === 'container' ? renderItem(item, color) : `<li>${renderItem(item, color)}</li>`).join('')}</ul>`;
            }

            const extraInfo = lesson.extraInfo ? `<div class="arabic-text text-xs mt-5 p-3 rounded-lg flex gap-2 items-start shadow-sm" style="color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-soft);"><i class="${lesson.extraInfo.icon}" style="color:var(--accent);margin-top:0.25rem;"></i><span>${lesson.extraInfo.text}</span></div>` : '';

            card.innerHTML = `
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold font-mono" style="background:${color === 'blue' ? 'var(--accent-soft)' : `var(--${color}-50, var(--bg-interactive))`};color:${color === 'blue' ? 'var(--accent)' : `var(--${color}-600, var(--text-primary))`}">${lesson.id}</span>
                        <h3 class="text-lg font-bold text-academic-primary">${lesson.title}</h3>
                    </div>
                    <i class="${lesson.icon}" style="color:${color === 'blue' ? 'var(--accent)' : 'var(--text-muted)'};opacity:0.6;"></i>
                </div>
                ${contentBody}${extraInfo}${renderFiles(lesson)}`;

            mainContainer.appendChild(card);
        });

        setupInteractions();
        animateCards();
    }

    function setupInteractions() {
        const isMobile = () => window.matchMedia('(max-width: 767px), (hover: none)').matches;
        const readCode = element => decodeURIComponent(element.dataset.code || '').replace(/\\n/g, '\n');

        const hideOverlay = () => {
            if (!overlay) return;
            overlay.classList.add('opacity-0', 'translate-x-10', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'translate-x-0');
        };

        const showOverlay = element => {
            if (!overlay || !overlayContent || isMobile()) return;
            const code = readCode(element);
            if (!code) return;
            overlayContent.textContent = code;
            overlay.classList.remove('opacity-0', 'translate-x-10', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'translate-x-0');
            clearTimeout(overlayTimeout);
        };

        document.querySelectorAll('[data-code]').forEach(element => {
            element.addEventListener('mouseenter', () => showOverlay(element));
            element.addEventListener('mouseleave', () => {
                overlayTimeout = setTimeout(hideOverlay, 300);
            });
            element.addEventListener('focus', () => showOverlay(element));
            element.addEventListener('blur', hideOverlay);
            element.addEventListener('click', () => {
                if (!isMobile()) {
                    showOverlay(element);
                    return;
                }

                const existing = element.nextElementSibling?.classList.contains('mobile-code-preview')
                    ? element.nextElementSibling
                    : null;
                document.querySelectorAll('.mobile-code-preview').forEach(preview => {
                    if (preview !== existing) preview.remove();
                });
                if (existing) {
                    existing.remove();
                    element.setAttribute('aria-expanded', 'false');
                    return;
                }

                const preview = document.createElement('pre');
                preview.className = 'mobile-code-preview';
                preview.textContent = readCode(element);
                element.insertAdjacentElement('afterend', preview);
                element.setAttribute('aria-expanded', 'true');
            });
        });

        document.querySelectorAll('.toggle-btn').forEach(button => {
            button.addEventListener('click', event => {
                event.stopPropagation();
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!isExpanded));
                button.nextElementSibling?.classList.toggle('expanded');
            });
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') hideOverlay();
        });
    }

    function animateCards() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('#lesson-grid .academic-card').forEach((card, index) => {
            card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
            card.style.transitionDelay = `${index * 50}ms`;
            observer.observe(card);
        });
    }

    renderLessonsGrid();
});
