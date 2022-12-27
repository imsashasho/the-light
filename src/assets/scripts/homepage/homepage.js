import i18next from 'i18next';
import { gsap, ScrollTrigger } from 'gsap/all';
import axios from 'axios';
import $ from 'jquery';
// import Swiper from 'swiper';
import Swiper, { Navigation, Controller, Pagination, Virtual, EffectFade, EffectCoverflow} from 'swiper';
import { horizontal } from 'gsap/Observer';

/** ******************************* */
import layoutData from '../../../static/data-for-layout-pop-up.json';

global.gsap = gsap;
global.axios = axios;

/* eslint-disable-next-line */
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smoothMobile: false,
//   inertia: 1.1,
// });

// ------------ Запуск функций для desctop -------------
if (window.matchMedia('(min-width: 1280px)').matches) {
}


(() => {
  const refs = {
    openModalBtn: document.querySelectorAll('.hero__text-block-btn'),
    closeModalBtn: document.querySelector('.js-video-popup-close'),
    modal: document.querySelector('.video-popup'),
  };

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
  }
  [...refs.openModalBtn].map(btn => btn.addEventListener('click', toggleModal));
  refs.closeModalBtn.addEventListener('click', toggleModal);
})();

// ******************** SWIPER ***********************************************************

// -------------------swiper in about section -------------------------

const swiper_1 = new Swiper('.swiper_1', {
  modules: [Navigation, Controller, Pagination],
  simulateTouch: false,
  rewind: true,
  speed: 1000,
  navigation: {
    nextEl: document.querySelector('.about__btn-swiper-right'),
    prevEl: document.querySelector('.about__btn-swiper-left'),
  },
});

const swiper_2 = new Swiper('.swiper_2', {
  modules: [Navigation, Controller],
  simulateTouch: false,
  rewind: true,
  allowTouchMove: false,
});

const swiper_number_about = new Swiper('.swiper_nuber_about', {
  modules: [Navigation, Controller, Virtual],
  spaceBetween: 10,
  virtual: {
    slides: (() => {
      const slides = [];
      for (let i = 1; i <= swiper_1.slides.length; i++) {
        slides.push(`${i}`);
      }
      return slides;
    })(),
  },
  simulateTouch: false,
  rewind: true,
  direction: 'vertical',
  allowTouchMove: false,
});

const swiper_text = new Swiper('.swiper_text', {
  modules: [Navigation, Controller, EffectFade],
  simulateTouch: false,
  allowTouchMove: false,
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

const switchAllSlidesToNextInAbout = () => {
  swiper_1.slideNext(1000);
};
const switchAllSlidesToPrevInAbout = () => {
  swiper_1.slidePrev(1000);
};

swiper_1.on('activeIndexChange', (e) => {
  swiper_2.slideTo(e.realIndex, 1000);
  swiper_number_about.slideTo(e.realIndex, 1000);
  swiper_text.slideTo(e.realIndex, 1000);
});

const aboutSliderTotal = document.querySelector('.about__slider-total');
// const aboutSliderCurrent = document.querySelector('.about__slider-current');

aboutSliderTotal.innerHTML = swiper_1.slides.length < 10 ? `0${swiper_1.slides.length}` : `${swiper_1.slides.length}`;

[
  ...document
    .querySelector('.about')
    .querySelector('.swiper_1')
    .querySelectorAll('.swiper-slide'),
].map(activeSlide => activeSlide.addEventListener('click', switchAllSlidesToNextInAbout));
[
  ...document
    .querySelector('.about')
    .querySelector('.swiper_2')
    .querySelectorAll('.swiper-slide'),
].map(activeSlide => activeSlide.addEventListener('click', switchAllSlidesToNextInAbout));

// ----------------------- swiper_benefits ---------------------------------------------------

const swiper_benefits = new Swiper('.swiper_benefits', {
  modules: [Navigation, Controller, Pagination, EffectCoverflow],
  loop: true,
  centeredSlides: true,
  initialSlide: 0,
  speed: 1000,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  slideToClickedSlide: true,
  breakpoints: {
    320: { spaceBetween: 0 },
    768: { spaceBetween: 14 },
    1920: { spaceBetween: 20 },
  },
});

const swiper_number_benefits = new Swiper('.swiper_nuber_benefits', {
  modules: [Navigation, Controller, Virtual],
  spaceBetween: 10,
  virtual: {
    slides: (() => {
      const slides = [];
      const total = document
        .querySelector('.benefits__slider-fraction')
        .querySelector('.swiper-pagination-total').innerHTML;
      for (let i = 1; i <= total; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        slides.push(`${i}`);
      }
      return slides;
    })(),
  },
  simulateTouch: false,
  allowTouchMove: false,
  rewind: true,
  direction: 'vertical',
});

const swiper_benefits_text = new Swiper('.swiper_benefits_text', {
  modules: [Navigation, Controller, EffectFade],
  simulateTouch: false,
  allowTouchMove: false,
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

// swiper_benefits.controller.control = swiper_number_benefits;
swiper_benefits.on('activeIndexChange', (e) => {
  swiper_number_benefits.slideTo(e.realIndex, 1000);
  swiper_benefits_text.slideTo(e.realIndex, 1000);
});

const switchAllSlidesToNextInBenefits = () => {
  swiper_benefits.slideNext(1000);
  swiper_number_benefits.slideTo(swiper_benefits.realIndex, 1000);
  swiper_benefits_text.slideTo(swiper_benefits.realIndex, 1000);
};
const switchAllSlidesToPrevInBenefits = () => {
  swiper_benefits.slidePrev(1000);
  swiper_number_benefits.slideTo(swiper_benefits.realIndex, 1000);
  swiper_benefits_text.slideTo(swiper_benefits.realIndex, 1000);
};
document
  .querySelector('.benefits__btn-swiper-right')
  .addEventListener('click', switchAllSlidesToNextInBenefits);
document
  .querySelector('.benefits__btn-swiper-left')
  .addEventListener('click', switchAllSlidesToPrevInBenefits);

const benefitsSliderTotal = document.querySelector('.benefits__slider-total');
const totalSlideFromFraction = document
  .querySelector('.benefits__slider-fraction')
  .querySelector('.swiper-pagination-total').innerHTML;
benefitsSliderTotal.innerHTML = totalSlideFromFraction < 10 ? `0${totalSlideFromFraction}` : `${totalSlideFromFraction}`;

// ---------------------- paralax-logo ---------------------
gsap.registerPlugin(ScrollTrigger);
export default function paralax(selector, scroller, amplitude = 35) {
  const paralaxImages = document.querySelectorAll(selector);
  paralaxImages.forEach((image) => {
    gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          scrub: 0.5,
          scroller: scroller || null,
          // markers: true,
        },
      })
      .fromTo(
        image,
        {
          y: amplitude,
        },
        {
          y: amplitude * -1,
          // ease: 'linear',
        },
      );
  });
}

function paralaxFeather(selector, scroller, amplitude = 35) {
  const paralaxImages = document.querySelectorAll(selector);
  paralaxImages.forEach((image) => {
    gsap
      .timeline({
        ease: 'none',
        scrollTrigger: {
          trigger: image,
          scrub: 0.5,
          scroller: scroller || null,
          // markers: true,
        },
      })
      .fromTo(
        image,
        {
          x: amplitude,
          // y: amplitude * 2,
          // scale: 1.1,
        },
        {
          x: amplitude * -1,
          // y: amplitude * -2,
          // ease: 'linear',
        },
      );
  });
}
// -----------------------------------------------------------------------------------------------

// function paralaxNumbers(selector, amplitude = 35) {
const paralaxNumbers = [...document.querySelectorAll('.numbers__item-blue-text')];
const paralaxText = [...document.querySelectorAll('.numbers__item-white-text')];
paralaxNumbers.forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      // start: 'top 80%',
      // markers: true,
    },
    y: 20,
    opacity: 0.5,
    duration: 0.5,
    scrub: 0.5,
    ease: 'none',
  });
  gsap.from(paralaxText[index], {
    scrollTrigger: {
      trigger: paralaxText[index],
      // start: 'top 60%',
      // markers: true,
    },
    y: 30,
    opacity: 0.5,
    duration: 1,
    // delay: 0.5,
    scrub: 1,
    ease: 'none',
  });
});

//   paralaxText.forEach(item => {

// });

// -----------------для разных расширений экрана - разные велечины амплитуды ---------------------
if (window.matchMedia('(max-width: 767px)').matches) {
  paralax('.parallax-logo__light', '', 20);
  paralax('.parallax-logo__the', '', 45);
  paralax('.parallax-logo__feather', '', 70);
}
if (
  window.matchMedia('(min-width: 768px)').matches
  && window.matchMedia('(max-width: 1279px)').matches
) {
  paralax('.parallax-logo__light', '', 30);
  paralax('.parallax-logo__the', '', 90);
  paralax('.parallax-logo__feather', '', 100);
}

if (
  window.matchMedia('(min-width: 1280px)').matches
  && window.matchMedia('(max-width: 1920px)').matches
) {
  paralax('.parallax-logo__light', '', 60);
  paralax('.parallax-logo__the', '', 100);
  paralax('.parallax-logo__feather', '', 120);
}
if (window.matchMedia('(min-width: 1920px)').matches) {
  paralax('.parallax-logo__light', '', 75);
  paralax('.parallax-logo__the', '', 120);
  paralax('.parallax-logo__feather', '', 150);
}

// ---------------------------- swiper_gallery -----------------------------------------

// const leftBtnGallery = document
//   .querySelector('.gallery__wrappper-buttom')
//   .querySelector('.btn-swiper-left');
// const rightBtnGallery = document
//   .querySelector('.gallery__wrappper-buttom')
//   .querySelector('.btn-swiper-right');

const swiper_gallery = new Swiper('.swiper_gallery', {
  loop: true,
  centeredSlides: true,
  initialSlide: 0,
  speed: 1000,
  slidesPerView: 'auto',
  // loopedSlides: 1.2,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.btn-swiper-right',
    prevEl: '.btn-swiper-left',
  },
  slideToClickedSlide: true,
  breakpoints: {
    320: { spaceBetween: 14 },
    1920: { spaceBetween: 20 },
  },
});

[...document.querySelector('.swiper_gallery').querySelectorAll('img')].forEach((img) => {
  img.addEventListener('click', () => {
    swiper_gallery.slideNext(1000);
  });
});

const big_swiper_gallery = new Swiper('.big-swiper_gallery', {
  loop: true,
  centeredSlides: true,
  initialSlide: 0,
  speed: 1000,
  slidesPerView: 'auto',
  // loopedSlides: 1.2,
  pagination: {
    el: '.swiper-pagination.big-swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.big-swiper-gallery-swiper-right',
    prevEl:'.big-swiper-gallery-swiper-left',
  },
});

[...document.querySelector('.big-swiper_gallery').querySelectorAll('img')].forEach((img) => {
  img.addEventListener('click', () => {
    big_swiper_gallery.slideNext(1000);
  });
});

// ----------------------------- open and close big_swiper_gallery ---------------------------

[...document.querySelectorAll('.js-open-big-gallery')].forEach(img => img.addEventListener('click', () => {
  document.body.classList.toggle('modal-open');
  document.querySelector('.gallery-beckdrop').classList.toggle('is-hidden');
}));
document.querySelector('.js-close-big-gallery').addEventListener('click', () => {
  document.body.classList.toggle('modal-open');
  document.querySelector('.gallery-beckdrop').classList.toggle('is-hidden');
});
console.log(swiper_gallery.params.navigation)
console.log(big_swiper_gallery.params.navigation)
swiper_gallery.params.control = big_swiper_gallery;
big_swiper_gallery.params.control = swiper_gallery;



// ---------------------------------------------------------------------------

// -------------------------- swiper_our_projects ------------------------------------
const swiper_our_projects = new Swiper('.swiper_our_projects', {
  modules: [Navigation, Controller, Pagination, EffectCoverflow],
  loop: true,
  centeredSlides: true,
  initialSlide: 0,
  speed: 1000,
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  slideToClickedSlide: true,
  breakpoints: {
    320: { spaceBetween: 0 },
    768: { spaceBetween: 14 },
    1920: { spaceBetween: 20 },
  },
});

const swiper_number_our_projects = new Swiper('.swiper_nuber_our_projects', {
  modules: [Navigation, Controller, Virtual],
  spaceBetween: 10,
  virtual: {
    slides: (() => {
      const slides = [];
      const total = document
        .querySelector('.our_projects__slider-fraction')
        .querySelector('.swiper-pagination-total').innerHTML;
      for (let i = 1; i <= total; i++) {
        if (i < 10) {
          i = `0${i}`;
        }
        slides.push(`${i}`);
      }
      return slides;
    })(),
  },
  simulateTouch: false,
  rewind: true,
  direction: 'vertical',
  allowTouchMove: false,
});

const swiper_our_projects_text = new Swiper('.swiper_our_projects_text', {
  modules: [Navigation, Controller, EffectFade],
  simulateTouch: false,
  allowTouchMove: false,
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

const swiper_our_projects_title_text = new Swiper('.swiper_our_projects_title_text', {
  modules: [Navigation, Controller, EffectFade],
  simulateTouch: false,
  allowTouchMove: false,
  autoHeight: true,
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
});

// swiper_our_projects.controller.control = swiper_number_our_projects;
swiper_our_projects.on('activeIndexChange', (e) => {
  swiper_number_our_projects.slideTo(e.realIndex, 1000);
  swiper_our_projects_text.slideTo(e.realIndex, 1000);
  swiper_our_projects_title_text.slideTo(e.realIndex, 1000);
});

const switchAllSlidesToNextInOurProjects = () => {
  swiper_our_projects.slideNext(1000);
  swiper_number_our_projects.slideTo(swiper_our_projects.realIndex, 1000);
  swiper_our_projects_text.slideTo(swiper_our_projects.realIndex, 1000);
  swiper_our_projects_title_text.slideTo(swiper_our_projects.realIndex, 1000);
};
const switchAllSlidesToPrevInOurProjects = () => {
  swiper_our_projects.slidePrev(1000);
  swiper_number_our_projects.slideTo(swiper_our_projects.realIndex, 1000);
  swiper_our_projects_text.slideTo(swiper_our_projects.realIndex, 1000);
  swiper_our_projects_title_text.slideTo(swiper_our_projects.realIndex, 1000);
};
document
  .querySelector('.our_projects__btn-swiper-right')
  .addEventListener('click', switchAllSlidesToNextInOurProjects);
document
  .querySelector('.our_projects__btn-swiper-left')
  .addEventListener('click', switchAllSlidesToPrevInOurProjects);

const our_projectsSliderTotal = document.querySelector('.our_projects__slider-total');
const ourProjectsTotalSlideFromFraction = document
  .querySelector('.our_projects__slider-fraction')
  .querySelector('.swiper-pagination-total').innerHTML;
our_projectsSliderTotal.innerHTML = ourProjectsTotalSlideFromFraction < 10
  ? `0${ourProjectsTotalSlideFromFraction}`
  : `${ourProjectsTotalSlideFromFraction}`;

// ------------------------------- show active news on mobile ----------------------------------------
// if (window.matchMedia('(max-width: 767px)').matches) {
//   const arrNews = [
//     ...document.querySelector('.news .news__content-list').querySelectorAll('.news__content-item'),
//   ];

//   if (arrNews.length > 0) {
//     arrNews[0].classList.add('active-news');
//   }
//   const switchingNewsOnMobileNext = () => {
//     let activeId = 1;
//     arrNews.forEach((item) => {
//       if (item.classList.contains('active-news')) {
//         activeId = +item.dataset.id === arrNews.length ? 1 : +item.dataset.id + 1;
//         item.classList.remove('active-news');
//       }
//     });
//     arrNews.forEach((item) => {
//       if (+item.dataset.id === activeId) {
//         item.classList.add('active-news');
//       }
//     });
//   };

//   const switchingNewsOnMobilePrev = () => {
//     let activeId = 1;
//     arrNews.forEach((item) => {
//       if (item.classList.contains('active-news')) {
//         activeId = +item.dataset.id === 1 ? arrNews.length : +item.dataset.id - 1;
//         item.classList.remove('active-news');
//       }
//     });
//     arrNews.forEach((item) => {
//       if (+item.dataset.id === activeId) {
//         item.classList.add('active-news');
//       }
//     });
//   };

//   const newsBtnNext = document
//     .querySelector('.news .news__title-block')
//     .querySelector('.news__title-block-btn-right');
//   newsBtnNext.addEventListener('click', () => switchingNewsOnMobileNext());

//   const newsBtnPrev = document
//     .querySelector('.news .news__title-block')
//     .querySelector('.news__title-block-btn-left');
//   newsBtnPrev.addEventListener('click', () => switchingNewsOnMobilePrev());
// }
// -----------------------------------------------------------------------

const arrPathMobile = document.querySelector('#layout_svg-mobile').querySelectorAll('.svg-path');
const arrPathDesctop = document.querySelector('#layout_svg-desctop').querySelectorAll('.svg-path');

document.querySelector('.layout__data-btn').addEventListener('click', () => {
  document.body.classList.toggle('modal-open');
  document.querySelector('.layout-beckdrop').classList.toggle('is-hidden');
});

const baseUrlFromBody = document.getElementsByTagName('body')[0].dataset.imgBaseUrl;

const layout__swiper = new Swiper('.layout__swiper', {
  modules: [Navigation, Controller, EffectFade],
  simulateTouch: false,
  allowTouchMove: false,
  rewind: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: document.querySelector('.layout-beckdrop').querySelector('.layout__btn-swiper-right'),
    prevEl: document.querySelector('.layout-beckdrop').querySelector('.layout__btn-swiper-left'),
  },
  speed: 2000,
});
const leftBtnPopUpLayout = document.querySelector('.floor-btn-left');
const rightBtnPopUpLayout = document.querySelector('.floor-btn-right');
layout__swiper.on('activeIndexChange', (e) => {
  leftBtnPopUpLayout.classList.toggle('active-floor-btn');
  rightBtnPopUpLayout.classList.toggle('active-floor-btn');
});
[leftBtnPopUpLayout, rightBtnPopUpLayout].forEach(btn => btn.addEventListener('click', () => {
  if (btn.classList.contains('active-floor-btn')) return;
  layout__swiper.slideNext(1000);
}));

const openLayoutPopUpWithData = (path) => {
  layout__swiper.slideTo(0);
  const dataForLayoutPopUp = layoutData[path.dataset.id];
  const layoutSwiper = document.querySelector('.layout-beckdrop').querySelector('.layout__swiper');
  const layoutDataRef = document
    .querySelector('.layout-beckdrop')
    .querySelector('.layout__data-wrapper');
  const layoutSliders = layoutSwiper.querySelectorAll('.layout__swiper-slide');

  layoutSliders[0].getElementsByTagName(
    'img',
  )[0].src = `${baseUrlFromBody}${dataForLayoutPopUp.floorsImages.floorPlan[0]}`;
  layoutSliders[1].getElementsByTagName(
    'img',
  )[0].src = `${baseUrlFromBody}${dataForLayoutPopUp.floorsImages.floorPlan[1]}`;

  const houseNumber = layoutDataRef
    .querySelector('.layout__data-house')
    .querySelector('.layout__data-number');
  houseNumber.textContent = `${dataForLayoutPopUp.id}`;

  const floorNumberLeft = layoutDataRef
    .querySelector('.wrapper-floor-btn')
    .querySelector('.floor-btn-left');
  floorNumberLeft.textContent = `${dataForLayoutPopUp.floorsImages.titles[0]}`;
  const floorNumberRight = layoutDataRef
    .querySelector('.wrapper-floor-btn')
    .querySelector('.floor-btn-right');
  floorNumberRight.textContent = `${dataForLayoutPopUp.floorsImages.titles[1]}`;

  const floorNumber = layoutDataRef
    .querySelector('.layout__data-floor')
    .querySelector('.layout__data-number');
  floorNumber.textContent = `${dataForLayoutPopUp.flatCount} м²`;

  const apartmentsNumber = layoutDataRef
    .querySelector('.layout__data-apartments')
    .querySelector('.layout__data-number');
  apartmentsNumber.textContent = `${dataForLayoutPopUp.totalArea} м²`;

  document.body.classList.toggle('modal-open');
  document.querySelector('.layout-beckdrop').classList.toggle('is-hidden');
};

[...arrPathMobile, ...arrPathDesctop].forEach((path) => {
  path.addEventListener('click', () => openLayoutPopUpWithData(path));
});

// --------------------------- layout-img-beckdrop -------------------------------

const arrLayoutPopUpImages = document
  .querySelector('.layout-beckdrop')
  .querySelectorAll('.layout__swiper-slide img');

arrLayoutPopUpImages.forEach(img => img.addEventListener('click', () => {
  const activeImg = document
    .querySelector('.layout-beckdrop')
    .querySelector('.layout__swiper-slide.swiper-slide-active img');
  document.querySelector('.layout-img-beckdrop').querySelector('.layout-img-big').src = activeImg.src;
  document.querySelector('.layout-img-beckdrop').classList.toggle('is-hidden');
}));

document
  .querySelector('.layout-img-beckdrop')
  .querySelector('.js-close-big-layout-img')
  .addEventListener('click', () => {
    document.querySelector('.layout-img-beckdrop').classList.toggle('is-hidden');
  });
//--------------------------------------------------------

[...arrPathMobile, ...arrPathDesctop].forEach((path) => {
  path.addEventListener('mouseover', () => {
    path.classList.add('hover');
    document
      .querySelector(`.layout .layout__circle-${path.dataset.id}`)
      .querySelector('.layout__content')
      .classList.add('layout__content-show');
  });
  path.addEventListener('mouseout', () => {
    path.classList.remove('hover');
    document
      .querySelector(`.layout .layout__circle-${path.dataset.id}`)
      .querySelector('.layout__content')
      .classList.remove('layout__content-show');
  });
});

//---------------------------------------------------------------------

// ------------------------------- news pop-up ------------------------------------------------------
// const arrNewsItem = document.querySelector('.news').querySelectorAll('.js-news__content-item');

// const fillDataNewsPopup = () => {
//   const elem = document.querySelector(
//     '.pop-up-news-beckdrop .page-container .pop-up-news .pop-up-news__content-block',
//   );
//   arrNewsItem.forEach(item => item.addEventListener('click', () => {
//     const dataFromItem = JSON.parse(item.dataset.dataForPopUp);
//     const arrSecondTextBlock = [];
//     [...dataFromItem.dataArray].map(({ title, text, img }) => {
//       const secondTextBlock = `<li class="pop-up-news__content-item">
//                                 ${
//   title
//     ? `<h2 class="pop-up-news__content-item-title">${title}</h2>`
//     : ''
// }
//                                   ${
//   text
//     ? `<p class="pop-up-news__content-item-text">${text}</p>`
//     : ''
// }
//                                     ${
//   img
//     ? `<img class="pop-up-news__content-item-img" src=${img} alt=""/>`
//     : ''
// }
//                               </li>`;
//       arrSecondTextBlock.push(secondTextBlock);
//     });
//     const markup = `<div class="pop-up-news__content-wrapper">
//                           <div class="pop-up-news__content-header">
//                             <div class="pop-up-news__content-date">${dataFromItem.date}</div>
//                             <h1 class="pop-up-news__content-title">${dataFromItem.title}</h1>
//                             <ul class="pop-up-news__content-list">${arrSecondTextBlock.join(
//     '',
//   )}</ul>
//                           </div>
//                         </div>`;
//     elem.innerHTML = markup;
//   }));
// };
// fillDataNewsPopup();

// if (window.matchMedia('(min-width: 1280px)').matches) {
//   let IndexMouseover = 0;
//   let IndexMouseout;
//   let firstOver = true;

//   if (arrNewsItem.length === 1) {
//     arrNewsItem.forEach((item, index) => {
//       item.addEventListener('mouseover', (e) => {
//         item.classList.remove('news__content-item-mouseout');
//         item.classList.add('news__content-item-mouseover');
//       });

//       item.addEventListener('mouseout', () => {
//         item.classList.remove('news__content-item-mouseover');
//         item.classList.add('news__content-item-mouseout');
//       });
//     });
//   }
//   arrNewsItem.forEach((item, index) => {
//     item.addEventListener('mouseover', (e) => {
//       IndexMouseover = index;
//       if (!firstOver && IndexMouseover === IndexMouseout) return;
//       arrNewsItem.forEach((item) => {
//         item.classList.remove('news__content-item-mouseover');
//         item.classList.remove('news__content-item-mouseout');
//         firstOver = null;
//       });
//       arrNewsItem[IndexMouseover].classList.add('news__content-item-mouseover');
//       arrNewsItem[IndexMouseout].classList.add('news__content-item-mouseout');
//     });

//     item.addEventListener('mouseout', () => {
//       IndexMouseout = index;
//     });
//   });
// }


gsap
  .timeline({
    scrollTrigger: {
      trigger: 'section.hero',
      scrub: 1,
      start: '0% top',
      end: '100% top',
      // markers: true,
    },
  })
  .to('.img-container', {
    // y: 150,
    scale: 1.1,
  })
  .to('.hero .page-container', { autoAlpha: 0, duration: 0.25 }, '<');

// -------------------- scroll to next block --------------------------------------
$('.hero__btn-scroll').click(() => {
  $('html, body').animate(
    {
      scrollTop: $('#about').offset().top,
    },
    1500,
  );
});
