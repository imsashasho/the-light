function menuOpen(menu) {
  menu.classList.add('menu__active');
  const createAnimation = (links, translateY = 0, delay = 0) => {
    links.forEach((link, i) => {
      // eslint-disable-next-line no-undef
      gsap.from(link, {
        delay: delay + i / 10,
        y: translateY,
        opacity: 0,
      });
    });
  };

  const links1 = menu.querySelectorAll('[data-animation1]');
  const links2 = menu.querySelectorAll('[data-animation2]');
  const links3 = menu.querySelectorAll('[data-animation3]');
  createAnimation(links1, 100, 0.5);
  createAnimation(links2, 100, 0.8);
  createAnimation(links3, 100, 1.1);
}

function menuClose(menu) {
  menu.classList.remove('menu__active');
}

function init() {
  const unSelectHandler = (container) => {
    const elem = container.querySelector('.select-items');
    if (!elem.classList.contains('select-hide')) {
      container.classList.remove('select-arrow-active');
      elem.classList.add('select-hide');
    }
    window.removeEventListener('click', unSelectHandler);
  };
  // const selectHandler = event => {
  //   event.stopPropagation();
  //   const container = event.target.closest('[data-lang]');
  //   container.classList.add('select-arrow-active');
  //   container.querySelector('.select-items').classList.remove('select-hide');
  //   window.addEventListener('click', unSelectHandler.bind(null, container));
  // };
  // document.querySelector('[data-lang="mobile"]').addEventListener('click', selectHandler);
  // document.querySelector('[data-lang="desktop"]').addEventListener('click', selectHandler);

  // menuInit();
}

/** ******************************* */

function handlerClickMenu(callback) {
  [...document.querySelector('.header').querySelectorAll('.js-menu-item')].forEach((link) => {
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

// (() => {
//   const refs = {
//     arrOpenPopUpNewsBtn: document.querySelectorAll('.js-open-pop-up-news'),
//     closePopUpNewsBtn: document.querySelector('.js-close-pop-up-news'),
//     popUpNews: document.querySelector('.pop-up-news-beckdrop'),
//   };

//   function togglePopUpNews() {
//     document.body.classList.toggle('modal-open');
//     refs.popUpNews.classList.toggle('is-hidden');
//   }
//   [...refs.arrOpenPopUpNewsBtn].map(btn => btn.addEventListener('click', togglePopUpNews));
//   refs.closePopUpNewsBtn.addEventListener('click', togglePopUpNews);
// })();

const headerPositionHendler = () => {
  if (document.querySelector('.page__content').getBoundingClientRect().top === 0) {
    document.querySelector('.header').classList.add('header-start-position');
    return;
  }
  document.querySelector('.header').classList.remove('header-start-position');
};
headerPositionHendler();
window.addEventListener('scroll', headerPositionHendler);

window.addEventListener('DOMContentLoaded', init);
