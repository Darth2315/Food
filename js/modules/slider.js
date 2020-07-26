function slider() {
    // Slider Вариант 2 (более сложный, в виде карусели)

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Dots

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

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

    function currentSlide() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function currentDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextBtn.addEventListener('click', () => {
        
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // 500px
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlide();
        currentDot();
    });

    prevBtn.addEventListener('click', () => {
        
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentSlide();
        currentDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
           const slideTo = e.target.getAttribute('data-slide-to');
           
           slideIndex = slideTo;
           offset = deleteNotDigits(width) * (slideTo - 1);

           slidesField.style.transform = `translateX(-${offset}px)`;

           if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
           } else {
                current.textContent = slideIndex;
           }

           currentDot();
        });
    });

    // Slider Вариант 1

    // const slides = document.querySelectorAll('.offer__slide'),
    //       slider = document.querySelector('.offer__slider'),
    //       prevBtn = document.querySelector('.offer__slider-prev'),
    //       nextBtn = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');

    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show');
    //     });
    //     // slides.forEach(item => item.style.display = 'none');
            
    //     slides[slideIndex - 1].classList.add('show');
    //     slides[slideIndex - 1].classList.remove('hide');
    //     // slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // // dots

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

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prevBtn.addEventListener('click', () => {
    //     plusSlides(-1);

    //     dots.forEach(dot => dot.style.opacity = '.5');
    //     dots[slideIndex - 1].style.opacity = 1;
    // });

    // nextBtn.addEventListener('click', () => {
    //     plusSlides(1);

    //     dots.forEach(dot => dot.style.opacity = '.5');
    //     dots[slideIndex - 1].style.opacity = 1;
    // });

    // // dots кликабельные

    // dots.forEach(dot => {
    //     dot.addEventListener('click', (e) => {
    //         const slideTo = +e.target.getAttribute('data-slide-to');

    //         slideIndex = slideTo;
    //         showSlides(slideIndex);

    //         dots.forEach(dot => dot.style.opacity = '.5');
    //         dots[slideIndex - 1].style.opacity = 1;
    //     });
    // });
}

module.exports = slider;