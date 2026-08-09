const MOBILE_QUERY = '(max-width: 1023px)';
const OPEN_CLASS = 'is-open';
const BODY_OPEN_CLASS = 'category-drawer-open';

const drawer = document.querySelector('[data-category-drawer]');
const opener = document.querySelector('[data-category-drawer-open]');
const closeButton = drawer?.querySelector('[data-category-drawer-close]');

if (drawer && opener && closeButton) {
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    const overlay = document.createElement('button');
    overlay.type = 'button';
    overlay.className = 'category-drawer__overlay';
    overlay.setAttribute('aria-label', 'إغلاق التصنيفات');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    const setMobileState = () => {
        if (mobileQuery.matches) {
            drawer.setAttribute('role', 'dialog');
            drawer.setAttribute('aria-modal', 'true');
            close(false);
            return;
        }

        drawer.classList.remove(OPEN_CLASS);
        drawer.removeAttribute('role');
        drawer.removeAttribute('aria-modal');
        drawer.removeAttribute('aria-hidden');
        drawer.inert = false;
        overlay.classList.remove(OPEN_CLASS);
        overlay.setAttribute('aria-hidden', 'true');
        opener.setAttribute('aria-expanded', 'false');
        document.body.classList.remove(BODY_OPEN_CLASS);
    };

    function open() {
        if (!mobileQuery.matches) return;

        drawer.inert = false;
        drawer.setAttribute('aria-hidden', 'false');
        drawer.classList.add(OPEN_CLASS);
        overlay.classList.add(OPEN_CLASS);
        overlay.setAttribute('aria-hidden', 'false');
        opener.setAttribute('aria-expanded', 'true');
        document.body.classList.add(BODY_OPEN_CLASS);
        closeButton.focus();
    }

    function close(returnFocus = true) {
        drawer.classList.remove(OPEN_CLASS);
        overlay.classList.remove(OPEN_CLASS);
        overlay.setAttribute('aria-hidden', 'true');
        opener.setAttribute('aria-expanded', 'false');
        document.body.classList.remove(BODY_OPEN_CLASS);

        if (mobileQuery.matches) {
            drawer.setAttribute('aria-hidden', 'true');
            drawer.inert = true;
        }

        if (returnFocus && mobileQuery.matches) opener.focus();
    }

    opener.addEventListener('click', open);
    closeButton.addEventListener('click', () => close());
    overlay.addEventListener('click', () => close());

    drawer.addEventListener('click', event => {
        if (!mobileQuery.matches || !event.target.closest('.category-btn')) return;
        window.requestAnimationFrame(() => close(false));
    });

    document.addEventListener('keydown', event => {
        if (!drawer.classList.contains(OPEN_CLASS)) return;

        if (event.key === 'Escape') {
            close();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusable = [...drawer.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')]
            .filter(element => !element.hasAttribute('disabled'));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    mobileQuery.addEventListener('change', setMobileState);
    setMobileState();
}
