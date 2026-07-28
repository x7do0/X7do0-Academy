import i18n from './i18n.js';
import { lessons } from '../../data/python-lessons.js';

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    i18n.updateUI();

    const mainContainer = document.getElementById('lesson-grid');
    const overlay = document.getElementById('code-overlay');
    const overlayContent = document.getElementById('overlay-content');
    let overlayTimeout;

    if (document.body.dataset.page !== 'python') return;

    function keywordColorClass(color) {
        const map = { green: 'keyword:green', purple: 'keyword:purple', pink: 'keyword:pink', indigo: 'keyword:indigo', orange: 'keyword:orange' };
        return map[color] || 'keyword\\:blue';
    }

    function accentVar(color) {
        return color === 'blue' ? 'var(--accent)' : `var(--${color}-500, ${color})`;
    }

    function codeAttribute(code) {
        return encodeURIComponent(code || '');
    }

    function renderLessonsGrid() {
        if (!mainContainer || !lessons) return;

        mainContainer.innerHTML = '';
        const isAr = true;

        lessons.forEach((lesson, index) => {
            const card = document.createElement('section');
            const spanClass = lesson.span && lesson.span > 1 && !isAr ? `md:col-span-${lesson.span}` : '';
            const color = lesson.color || 'blue';
            card.className = `academic-card p-6 group ${spanClass}`;
            card.style.borderLeft = `4px solid ${accentVar(color)}`;

            const lessonTitle = isAr && lesson.titleAr ? lesson.titleAr : lesson.title;

            const header = `
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-3">
                        <span class="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold font-mono" style="background:${color === 'blue' ? 'var(--accent-soft)' : `var(--${color}-50, var(--bg-interactive))`};color:${color === 'blue' ? 'var(--accent)' : `var(--${color}-600, var(--text-primary))`}">${lesson.id}</span>
                        <h3 class="text-lg font-bold text-academic-primary">${lessonTitle}</h3>
                    </div>
                    <i class="${lesson.icon}" style="color:${color === 'blue' ? 'var(--accent)' : 'var(--text-muted)'};opacity:0.6;"></i>
                </div>
            `;

            let contentBody = '';

            if (lesson.layout === 'grid') {
                contentBody += `<div class="grid grid-cols-2 gap-3">`;
                (lesson.items || []).forEach(item => contentBody += renderItem(item, isAr, lesson.color));
                contentBody += `</div>`;
            } else if (lesson.layout === 'grid-column' && lesson.columns) {
                contentBody += `<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`;
                lesson.columns.forEach(col => {
                    contentBody += `<div class="space-y-4">`;
                    (col || []).forEach(item => contentBody += renderItem(item, isAr, lesson.color));
                    contentBody += `</div>`;
                });
                contentBody += `</div>`;
            } else {
                contentBody += `<ul class="space-y-3">`;
                (lesson.items || []).forEach(item => {
                    if (item.type === 'group' || item.type === 'container') {
                        contentBody += renderItem(item, isAr, lesson.color);
                    } else {
                        contentBody += `<li>${renderItem(item, isAr, lesson.color)}</li>`;
                    }
                });
                contentBody += `</ul>`;
            }

            if (lesson.extraInfo) {
                contentBody += `
                    <div class="arabic-text text-xs mt-5 p-3 rounded-lg flex gap-2 items-start shadow-sm" style="color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-soft);">
                        <i class="${lesson.extraInfo.icon}" style="color:var(--accent);margin-top:0.25rem;"></i>
                        <span>${lesson.extraInfo.text}</span>
                    </div>
                `;
            }

            const filesLabel = i18n.t('python.files_resources');
            const codeFileLabel = i18n.t('python.lesson_code');
            const challengeLabel = i18n.t('python.challenge');

            const filesSection = `
                <div class="mt-5 pt-4 border-t" style="border-color:var(--border-soft);">
                    <button class="w-full flex items-center justify-between group/toggle focus:outline-none toggle-btn" aria-expanded="false" style="cursor:pointer;">
                        <span class="text-[10px] font-bold tracking-widest uppercase" style="color:var(--text-muted);">
                            <i class="fas fa-folder-open me-2"></i> ${filesLabel}
                        </span>
                        <i class="fas fa-chevron-down text-[10px] transition-transform duration-300 toggle-icon" style="color:var(--text-muted);"></i>
                    </button>
                    <div class="collapsible-content">
                        <div class="space-y-2 pt-3">
                            ${lesson.files ? `
                                ${lesson.files.subject ? `
                                <a href="${lesson.files.subject}" download class="interactive-surface flex items-center justify-between p-2.5 transition-all duration-200 group/file">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded flex items-center justify-center" style="background:var(--accent-soft);color:var(--accent);">
                                            <i class="far fa-file-code"></i>
                                        </div>
                                        <div class="text-start">
                                            <div class="text-xs font-mono" style="color:var(--text-primary);">${codeFileLabel}</div>
                                            <div class="text-[10px]" style="color:var(--text-muted);">subject.py</div>
                                        </div>
                                    </div>
                                    <i class="fas fa-download" style="color:var(--text-muted);"></i>
                                </a>` : ''}
                                
                                ${lesson.files.challenge ? `
                                <a href="${lesson.files.challenge}" download class="interactive-surface flex items-center justify-between p-2.5 transition-all duration-200 group/file">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded flex items-center justify-center" style="background:var(--accent-soft);color:var(--accent);">
                                            <i class="fas fa-tasks"></i>
                                        </div>
                                        <div class="text-start">
                                            <div class="text-xs font-mono" style="color:var(--text-primary);">${challengeLabel}</div>
                                            <div class="text-[10px]" style="color:var(--text-muted);">challenge.py</div>
                                        </div>
                                    </div>
                                    <i class="fas fa-download" style="color:var(--text-muted);"></i>
                                </a>` : ''}
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;

            card.innerHTML = header + contentBody + filesSection;
            mainContainer.appendChild(card);
        });

        setupInteractions();
    }

    function renderItem(item, isAr, lessonColor) {
        if (!item || !item.type) return '';

        const items = item.items || [];
        const content = item.content || [];
        const itemLabel = isAr && item.labelAr ? item.labelAr : item.label;
        const kwColor = keywordColorClass(lessonColor);

        const blockStyle = `keyword p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer block w-full text-start ${kwColor}`;

        if (item.type === 'keyword') {
            const spanClass = item.span ? `col-span-${item.span}` : '';
            const alignClass = item.align === 'center' ? 'text-center' : 'text-start';
            let classes = `${blockStyle} text-sm font-mono font-bold ${alignClass} ${spanClass}`;
            return `<button type="button" class="${classes}" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'compound') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `
                <div class="space-y-2 w-full">
                    <button type="button" class="${blockStyle} text-sm font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>
                    <div class="arabic-text text-xs italic px-2 border-s-2 p-2 rounded" style="color:var(--text-secondary);border-color:var(--accent);background:var(--accent-soft);">${noteText}</div>
                </div>
            `;
        }

        if (item.type === 'alert') {
            const c = item.color || 'red';
            const bgVar = c === 'red' ? 'var(--danger-soft)' : 'var(--warning-soft)';
            const textVar = c === 'red' ? 'var(--danger)' : 'var(--warning)';
            return `
                <div class="arabic-text text-xs" style="color:${textVar};background:${bgVar};padding:0.5rem;border-radius:0.5rem;border:1px solid ${textVar}20;display:flex;align-items:center;gap:0.5rem;">
                    ${item.icon ? `<i class="${item.icon}" style="color:${textVar}"></i>` : ''}
                    ${item.text}
                </div>
            `;
        }

        if (item.type === 'group') {
            return `<div class="flex flex-wrap gap-2 w-full">
                ${items.map(subItem => renderItem(subItem, isAr, lessonColor)).join('')}
             </div>`;
        }

        if (item.type === 'pill' || item.type === 'pill-box') {
            return `<button type="button" class="${blockStyle} flex-1 text-center text-xs font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'code-box') {
            const noteText = item.note && typeof item.note === 'object' ? item.note.text : (item.note || '');
            return `<button type="button" class="code-surface keyword p-3 group/code cursor-pointer w-full text-start" data-code="${codeAttribute(item.code)}">
                <span class="font-bold font-mono text-sm block">${itemLabel}</span>
                ${noteText ? `<span class="arabic-text text-[10px] block" style="color:var(--text-muted);margin-top:0.5rem;">${noteText}</span>` : ''}
            </button>`;
        }

        if (item.type === 'container') {
            return `<div class="code-surface p-4 w-full">
                ${items.map(sub => {
                if (sub.type === 'divider') return `<div class="my-2 border-t" style="border-color:var(--border-soft);"></div>`;
                const subLabel = isAr && sub.labelAr ? sub.labelAr : sub.label;
                return `<button type="button" class="${blockStyle} text-sm font-mono font-bold mb-2" data-code="${codeAttribute(sub.code)}">${subLabel}</button>`;
            }).join('')}
             </div>`;
        }

        if (item.type === 'logic-row') {
            return `<button type="button" class="${blockStyle} flex justify-between items-center" data-code="${codeAttribute(item.code)}">
                <span class="font-bold font-mono text-sm">${itemLabel}</span>
                <span class="arabic-text text-[10px] px-2 py-1 rounded border shadow-sm" style="color:var(--text-secondary);background:var(--bg-interactive);border-color:var(--border-soft);">${item.arText}</span>
            </button>`;
        }

        if (item.type === 'module-box') {
            const moduleTitle = isAr && item.labelAr ? item.labelAr : item.title;
            return `<div class="code-surface p-4">
                <span class="font-mono font-bold text-sm block pb-2 mb-3" style="border-bottom:1px solid var(--accent);color:var(--accent);">${moduleTitle}</span>
                <div class="font-mono text-xs space-y-2 leading-relaxed font-semibold" style="color:var(--success);">
                    ${content.map(c => `
                        <div class="${c.comment ? 'flex justify-between' : 'truncate'}">
                            ${c.code} ${c.comment ? `<span style="color:var(--text-muted);font-weight:400;">${c.comment}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }

        if (item.type === 'method') {
            return `<button type="button" class="${blockStyle} text-xs font-mono font-bold" data-code="${codeAttribute(item.code)}">${itemLabel}</button>`;
        }

        if (item.type === 'text') {
            return `<div class="arabic-text text-xs mb-4 italic flex items-center gap-2" style="color:var(--text-muted);">
                    <div class="h-px w-4" style="background:var(--border);"></div>
                    ${item.text}
                </div>`;
        }

        return '';
    }

    const setupInteractions = () => {
        const isMobileInteraction = () => window.matchMedia('(max-width: 767px), (hover: none)').matches;
        const readCode = item => decodeURIComponent(item.getAttribute('data-code') || '').replace(/\\n/g, '\n');
        const showDesktopPreview = item => {
            if (!overlay || !overlayContent || isMobileInteraction()) return;
            const code = readCode(item);
            if (!code) return;
            overlayContent.textContent = code;
            overlay.classList.remove('opacity-0', 'translate-x-10', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'translate-x-0');
            clearTimeout(overlayTimeout);
        };
        const hideDesktopPreview = () => {
            if (!overlay) return;
            overlay.classList.add('opacity-0', 'translate-x-10', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'translate-x-0');
        };

        document.querySelectorAll('[data-code]').forEach(item => {
            item.addEventListener('mouseenter', () => {
                showDesktopPreview(item);
            });

            item.addEventListener('mouseleave', () => {
                overlayTimeout = setTimeout(() => {
                    hideDesktopPreview();
                }, 300);
            });

            item.addEventListener('focus', () => showDesktopPreview(item));
            item.addEventListener('blur', () => hideDesktopPreview());

            item.addEventListener('click', () => {
                if (!isMobileInteraction()) {
                    showDesktopPreview(item);
                    return;
                }

                const code = readCode(item);
                if (!code) return;
                const existingPreview = item.nextElementSibling?.classList.contains('mobile-code-preview')
                    ? item.nextElementSibling
                    : null;
                document.querySelectorAll('.mobile-code-preview').forEach(preview => {
                    if (preview !== existingPreview) preview.remove();
                });

                if (existingPreview) {
                    existingPreview.remove();
                    item.setAttribute('aria-expanded', 'false');
                    return;
                }

                const preview = document.createElement('pre');
                preview.className = 'mobile-code-preview';
                preview.textContent = code;
                item.insertAdjacentElement('afterend', preview);
                item.setAttribute('aria-expanded', 'true');
            });
        });

        if (!document.body.dataset.codeEscapeBound) {
            document.body.dataset.codeEscapeBound = 'true';
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape') hideDesktopPreview();
            });
        }

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const content = btn.nextElementSibling;
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !isExpanded);
                content.classList.toggle('expanded');
            });
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    const animateCards = () => {
        document.querySelectorAll('#lesson-grid .academic-card').forEach((card, index) => {
            card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
            card.style.transitionDelay = `${index * 50}ms`;
            observer.observe(card);
        });
    };

    renderLessonsGrid();
    animateCards();

});
