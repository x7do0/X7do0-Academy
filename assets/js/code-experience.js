const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export function renderCodeWindow({
    code = '',
    label = 'كود بايثون',
    filename = 'example.py',
    compact = false,
    copy = true
} = {}) {
    return `
        <section class="programming-window ${compact ? 'programming-window--compact' : ''}" dir="ltr">
            <div class="programming-window__toolbar">
                <div class="programming-window__traffic" aria-hidden="true"><span></span><span></span><span></span></div>
                <span class="programming-window__filename">${escapeHtml(filename)}</span>
                <div class="programming-window__actions">
                    <span class="programming-window__language">PY</span>
                    ${copy ? `
                        <button type="button" class="programming-window__copy" data-programming-copy aria-label="نسخ الكود">
                            <i class="far fa-copy" aria-hidden="true"></i>
                            <span>نسخ</span>
                        </button>` : ''}
                </div>
            </div>
            <div class="programming-window__label" dir="rtl">${escapeHtml(label)}</div>
            <pre tabindex="0"><code class="language-python" dir="ltr">${escapeHtml(code)}</code></pre>
        </section>`;
}

export function enhanceCodeWindows(root = document) {
    root.querySelectorAll('.programming-window code').forEach(code => {
        if (code.dataset.highlighted) return;
        window.hljs?.highlightElement(code);
        code.dataset.highlighted = 'true';
    });

    root.querySelectorAll('[data-programming-copy]').forEach(button => {
        if (button.dataset.copyReady) return;
        button.dataset.copyReady = 'true';
        button.addEventListener('click', async () => {
            const code = button.closest('.programming-window')?.querySelector('code')?.textContent || '';
            try {
                await navigator.clipboard.writeText(code);
                button.classList.add('is-copied');
                const label = button.querySelector('span');
                if (label) label.textContent = 'تم النسخ';
                setTimeout(() => {
                    button.classList.remove('is-copied');
                    if (label) label.textContent = 'نسخ';
                }, 1400);
            } catch {
                button.setAttribute('aria-label', 'تعذر نسخ الكود');
            }
        });
    });
}

export { escapeHtml };
