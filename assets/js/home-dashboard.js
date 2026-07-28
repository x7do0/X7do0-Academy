import { questions } from '../../data/python-practice-questions.js';
import { createProgressTracker } from './progress-tracker.js';
import i18n from './i18n.js';

const courses = [
    {
        id: 'python',
        questions,
        tracker: createProgressTracker('python', questions),
    },
];

function getCourseProgress(course) {
    const completed = course.tracker.getCompletedQuestions().length;
    const total = course.questions.length;

    return {
        completed,
        total,
        remaining: Math.max(total - completed, 0),
        percentage: total ? Math.round((completed / total) * 100) : 0,
    };
}

function getPathStatusKey(percentage) {
    if (percentage === 0) return 'dashboard.status_not_started';
    if (percentage === 100) return 'dashboard.status_completed';
    return 'dashboard.status_in_progress';
}

function renderHomeProgress() {
    const progressByCourse = courses.map(course => ({
        ...course,
        ...getCourseProgress(course),
    }));

    progressByCourse.forEach(course => {
        document.querySelectorAll(`[data-course-progress-value="${course.id}"]`).forEach(element => {
            element.textContent = `${course.percentage}%`;
        });
        document.querySelectorAll(`[data-course-progress-fill="${course.id}"]`).forEach(element => {
            element.style.width = `${course.percentage}%`;
        });
    });

    const completed = progressByCourse.reduce((sum, course) => sum + course.completed, 0);
    const total = progressByCourse.reduce((sum, course) => sum + course.total, 0);
    const remaining = Math.max(total - completed, 0);
    const percentage = total ? Math.round((completed / total) * 100) : 0;
    const status = i18n.t(getPathStatusKey(percentage));

    document.querySelectorAll('[data-home-progress-value]').forEach(element => {
        element.textContent = `${percentage}%`;
    });
    document.querySelectorAll('[data-home-progress-fill]').forEach(element => {
        element.style.width = `${percentage}%`;
    });

    const ring = document.querySelector('[data-home-progress-ring]');
    if (ring) {
        ring.style.setProperty('--progress', percentage);
        ring.setAttribute('aria-valuenow', String(percentage));
    }

    const values = {
        completed,
        total,
        remaining,
        status,
    };

    Object.entries(values).forEach(([key, value]) => {
        document.querySelectorAll(`[data-home-metric="${key}"]`).forEach(element => {
            element.textContent = value;
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    renderHomeProgress();
});
window.addEventListener('pageshow', async () => {
    await i18n.init();
    renderHomeProgress();
});
