'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2020-07-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


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

    // Class for Cards
    
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        // метод конвертации валют
        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
               new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
            });
        });


    // // Метод добавление карточек товаров на лету, без шаблонизации, если добавить нужно один раз
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                    'Content-type': 'application/json'
                },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.classList.add('spinner-img');
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider Вариант 1

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');

    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        // slides.forEach(item => item.style.display = 'none');
            
        slides[slideIndex - 1].classList.add('show');
        slides[slideIndex - 1].classList.remove('hide');
        // slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // dots

    slider.style.position = 'relative';
    
    const indicators = document.createElement('ol'),
          dots = [];
          indicators.classList.add('carousel-indicators');
          slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
              dot.classList.add('dot');
              dot.setAttribute('data-slide-to', i + 1);
              indicators.append(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prevBtn.addEventListener('click', () => {
        plusSlides(-1);

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    nextBtn.addEventListener('click', () => {
        plusSlides(1);

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    // dots кликабельные

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            showSlides(slideIndex);

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });


    // // Slider Вариант 2 (более сложный, в виде карусели)

    // const slides = document.querySelectorAll('.offer__slide'),
    //       slider = document.querySelector('.offer__slider'),
    //       prevBtn = document.querySelector('.offer__slider-prev'),
    //       nextBtn = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current'),
    //       slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //       slidesField = document.querySelector('.offer__slider-inner'),
    //       width = window.getComputedStyle(slidesWrapper).width;

    // let slideIndex = 1;
    // let offset = 0;

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    //     current.textContent = `0${slideIndex}`;
    // } else {
    //     total.textContent = slides.length;
    //     current.textContent = slideIndex;
    // }

    // // Dots

    // slidesField.style.width = 100 * slides.length + '%';
    // slidesField.style.display = 'flex';
    // slidesField.style.transition = '0.5s all';
    
    // slidesWrapper.style.overflow = 'hidden';

    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });

    // slider.style.position = 'relative';

    // const indicators = document.createElement('ol'),
    //       dots = [];
    //       indicators.classList.add('carousel-indicators');
    //       slider.append(indicators);

    // for (let i = 0; i < slides.length; i++) {
    //     const dot = document.createElement('li');
    //           dot.classList.add('dot');
    //           dot.setAttribute('data-slide-to', i + 1);
    //           indicators.append(dot);

    //     if (i == 0) {
    //         dot.style.opacity = 1;
    //     }

    //     dots.push(dot);
    // }

    // function currentSlide() {
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function currentDot() {
    //     dots.forEach(dot => dot.style.opacity = '.5');
    //     dots[slideIndex - 1].style.opacity = 1;
    // }

    // nextBtn.addEventListener('click', () => {
        
    //     if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // 500px
    //         offset = 0;
    //     } else {
    //         offset += +width.slice(0, width.length - 2);
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if (slideIndex == slides.length) {
    //         slideIndex = 1;
    //     } else {
    //         slideIndex++;
    //     }

    //     currentSlide();
    //     currentDot();
    // });

    // prevBtn.addEventListener('click', () => {
        
    //     if (offset == 0) {
    //         offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    //     } else {
    //         offset -= +width.slice(0, width.length - 2);
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     if (slideIndex == 1) {
    //         slideIndex = slides.length;
    //     } else {
    //         slideIndex--;
    //     }

    //     currentSlide();
    //     currentDot();
    // });

    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e) => {
    //        const slideTo = e.target.getAttribute('data-slide-to');
           
    //        slideIndex = slideTo;
    //        offset = +width.slice(0, width.length - 2) * (slideTo - 1);

    //        slidesField.style.transform = `translateX(-${offset}px)`;

    //        if (slides.length < 10) {
    //             current.textContent = `0${slideIndex}`;
    //        } else {
    //             current.textContent = slideIndex;
    //        }

    //        currentDot();
    //     });
    // });

});