// import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import { gsap, ScrollTrigger } from 'gsap/all';
import axios from 'axios';
import * as yup from 'yup';
import $ from 'jquery';
import { intersection } from 'lodash';
import Swiper, {
  Navigation,
  Controller,
  EffectFade,
  Pagination,
  Virtual,
  EffectCoverflow,
  Parallax,
} from 'swiper';
import { _horizontal } from 'gsap/Observer';
import Rellax from 'rellax';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import fake3d from './modules/sequence';

/** ******************************* */
import layoutData from '../../static/data-for-layout-pop-up.json';

/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;

/* eslint-disable-next-line */
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smoothMobile: false,
//   inertia: 1.1,
// });

// global.locoScroll = locoScroll;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
// const forms = ['[data-home-contact]'];
const formsWithRedirect = [
  '.feedback-form',
  '[data-manager-feedback-form]',
  '[data-feedback-contact-screen-form]',
];

// function putValueFromSelectToInput(selectSelector) {
//   const el = document.querySelector(selectSelector);
//   if (el === null) return;
//   const input = el.closest('.feedback-form__label').querySelector('input');
//   el.addEventListener('change', ({ target }) => {
//     input.value = target.value;
//     input.dispatchEvent(new Event('change'));
//     input.dispatchEvent(new Event('input'));
//   });
// }
// putValueFromSelectToInput('[data-feedback-form] select');
// putValueFromSelectToInput('[data-feedback-form-footer] select');
formsWithRedirect.forEach(form => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          // document.querySelector('.pop-up-beckdrop').classList.remove('is-hidden');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-name]'),
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .matches(/^[aA-zZа-яА-ЯёЁа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s]+$/, 'Поле має містити лише літери')
              .trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({
              animation: 'none',
              $field: $form.querySelector('[data-field-phone]'),
              typeInput: 'phone',
            }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });
  }
});
