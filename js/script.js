'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import 'dom-node-polyfills';
import 'whatwg-fetch';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    // Вызываем открытие модального окна через 50 секунд
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal('.modal', modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    calc();
    cards();
    forms('form', modalTimerId, showModalByScroll);
    modal('[data-modal]', '.modal', modalTimerId, showModalByScroll);
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currenCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-07-30');
});