const projectModal = document.querySelector('[data-dashboard-modal]');
const caseStudyModal = document.querySelector('[data-case-study-modal]');
const openProjectButton = document.querySelector('[data-open-project-modal]');
const openCaseStudyButton = document.querySelector('[data-open-case-study-modal]');
const closeProjectButtons = document.querySelectorAll('[data-close-project-modal]');
const closeCaseStudyButtons = document.querySelectorAll('[data-close-case-study-modal]');
const projectNameInput = document.querySelector('#case-study-project-name');
const caseStudySlugInput = document.querySelector('#case-study-slug');

const slugify = (value = '') => {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

const setModalState = (modal, isOpen) => {
    if (!modal) {
        return;
    }

    modal.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
};

if (openProjectButton) {
    openProjectButton.addEventListener('click', () => {
        setModalState(projectModal, true);
    });
}

if (openCaseStudyButton) {
    openCaseStudyButton.addEventListener('click', () => {
        setModalState(caseStudyModal, true);
    });
}

closeProjectButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setModalState(projectModal, false);
    });
});

closeCaseStudyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setModalState(caseStudyModal, false);
    });
});

if (projectModal) {
    projectModal.addEventListener('click', (event) => {
        if (event.target.matches('[data-dashboard-modal-backdrop]')) {
            setModalState(projectModal, false);
        }
    });
}

if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (event) => {
        if (event.target.matches('[data-dashboard-modal-backdrop]')) {
            setModalState(caseStudyModal, false);
        }
    });
}

if (projectModal || caseStudyModal) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setModalState(projectModal, false);
            setModalState(caseStudyModal, false);
        }
    });
}

if (projectNameInput && caseStudySlugInput) {
    projectNameInput.addEventListener('input', () => {
        if (caseStudySlugInput.value.trim() === '' || caseStudySlugInput.dataset.autofill === 'true') {
            caseStudySlugInput.dataset.autofill = 'true';
            caseStudySlugInput.value = slugify(projectNameInput.value);
        }
    });

    caseStudySlugInput.addEventListener('input', () => {
        caseStudySlugInput.dataset.autofill = 'false';
    });
}
