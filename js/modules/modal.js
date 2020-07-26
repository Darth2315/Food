function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {
    item.addEventListener('click', openModal);
    });

    function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
    window.removeEventListener('scroll', showModalByScroll);
    }

    function closeModal() {
    // modal.style.display = 'none';
    // или
    // modal.classList.toggle('show');
    // или
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    }

    // Убираем окно по щелчку на подложку или на крестик
    modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
    });

    // Закрываем окно клавишей Escape
    document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
    });

    // Вызываем открытие модального окна через 50 секунд
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
    }

    // Вызываем модальное окно, если пользователь долистал страницу до конца
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;