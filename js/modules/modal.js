function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

function openModal(modalSelector, modalTimerId, showModalByScroll) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    
    window.removeEventListener('scroll', showModalByScroll);
}

function modal(triggerSelector, modalSelector, modalTimerId, showModalByScroll) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId, showModalByScroll));
    });


    // Убираем окно по щелчку на подложку или на крестик
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // Закрываем окно клавишей Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // Вызываем модальное окно, если пользователь долистал страницу до конца
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;

export {
    closeModal, 
    openModal
};