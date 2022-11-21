import i18next from 'i18next';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

global.axios = axios;

const formsWithRedirect = [
  '.feedback-form',
  '[data-manager-feedback-form]',
  '[data-feedback-contact-screen-form]',
];

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

/** ******************************* */

function handlerClickMenu(callback) {
  [...document.querySelector('.header').querySelectorAll('.js-menu-item')].forEach(link => {
    link.addEventListener('click', callback);
  });
}

(() => {
  const refs = {
    openModalBtn: document.querySelectorAll('.js-feedback-form-open'),
    closeModalBtn: document.querySelector('.js-feedback-form-close'),
    modal: document.querySelector('.modal-beckdrop'),
  };

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
  }
  [...refs.openModalBtn].map(btn => btn.addEventListener('click', toggleModal));
  refs.closeModalBtn.addEventListener('click', toggleModal);
})();

(() => {
  const refs = {
    openModalBtn: document.querySelectorAll('.js-manager-feedback-form-open'),
    closeModalBtn: document.querySelector('.js-manager-feedback-form-close'),
    modal: document.querySelector('.manager-modal-beckdrop'),
  };

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
  }
  [...refs.openModalBtn].map(btn => btn.addEventListener('click', toggleModal));
  refs.closeModalBtn.addEventListener('click', toggleModal);
})();

(() => {
  const refs = {
    openMenuBtn: document.querySelector('.js-open-menu'),
    closeMenuBtn: document.querySelector('.js-close-menu'),
    menu: document.querySelector('.menu-beckdrop'),
  };

  function toggleMenu() {
    document.body.classList.toggle('modal-open');
    refs.menu.classList.toggle('is-hidden');
  }
  handlerClickMenu(toggleMenu);
  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
})();

// ---------------------------------- feedback form input handler ------------------------------

const inputArrey = [
  ...document.querySelectorAll('.feedback-form__input'),
  ...document.querySelectorAll('.manager-feedback-form__input'),
];
inputArrey.forEach(input => {
  if (input.value.length > 0) input.classList.add('input-with-text');
  input.addEventListener('change', () => {
    if (input.value.length > 0) {
      input.classList.add('input-with-text');
      return;
    }
    if (input.value.length === 0) {
      input.classList.remove('input-with-text');
    }
  });
});

const btnCloseFeedbackForm = document.querySelector('.js-feedback-form-close');
const feedbackForm = document.querySelector('.feedback-modal').querySelector('.feedback-form');

btnCloseFeedbackForm.addEventListener('click', () => {
  feedbackForm.reset();
  const inputsFeedbackForm = feedbackForm.querySelectorAll('.feedback-form__input');
  inputsFeedbackForm[0].classList.remove('input-with-text');
  inputsFeedbackForm[1].classList.remove('input-with-text');
});

const btnCloseManagerFeedbackForm = document.querySelector('.js-manager-feedback-form-close');
const managerFeedbackForm = document
  .querySelector('.manager-modal')
  .querySelector('.manager-feedback-form');

btnCloseManagerFeedbackForm.addEventListener('click', () => {
  managerFeedbackForm.reset();
  const inputsFeedbackForm = managerFeedbackForm.querySelectorAll('.manager-feedback-form__input');
  inputsFeedbackForm[0].classList.remove('input-with-text');
  inputsFeedbackForm[1].classList.remove('input-with-text');
});

// ================== loader ============================

const mask = document.querySelector('.mask');

window.addEventListener('load', () => {
  mask.classList.add('mask-hide');
  document.getElementsByTagName('body')[0].classList.remove('modal-open');
  setTimeout(() => {
    mask.remove();
  }, 1000);
});
// ======================================================================
