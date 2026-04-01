import Swiper, { Navigation } from 'swiper-legacy';
import { modalFactory } from './modal';

const SWIPER_GALLERY = '.swiper-gallery';
const POPUP_GALLERY = '.gallery-overlay';
const CLOSE_GALLERY = '.gallery-close-btn';

const constructionCloseBtnRef = document.querySelector(CLOSE_GALLERY);
const galleryModal = modalFactory(POPUP_GALLERY);
const galleryRef = document.querySelector(SWIPER_GALLERY);
const popupOverlayRef = document.querySelector(POPUP_GALLERY);

Swiper.use([Navigation]);
const swiperGallery = galleryRef
  ? new Swiper(SWIPER_GALLERY, {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    loop: true,
    lazy: {
      loadPrevNext: false,
      loadOnTransitionStart: true,
    },
    speed: 300,
    navigation: {
      prevEl: '.gallery-slider-prev',
      nextEl: '.gallery-slider-next',
    },
    // pagination: {
    //   el: '.gallery-slider__pagination',
    //   clickable: true,
    //   type: 'progressbar',
    //   direction: 'horizontal',
    // },
  })
  : null;

const openPopup = () => {
  galleryModal.open();
};

const closePopup = () => {
  galleryModal.close();
};

const openPopupWithSlides = (slides) => {
  if (!swiperGallery) {
    return;
  }
  openPopup();
  swiperGallery.removeAllSlides();
  swiperGallery.appendSlide(slides);
  swiperGallery.slideToLoop(0);
};

const handleVideoClick = (event) => {
  const { target } = event;
  const videoRef = target.closest('video');
  if (!videoRef) {
    return;
  }
  const playBtn = videoRef.parentNode.querySelector('.building-swiper-video__button');

  if (!videoRef.paused) {
    playBtn.classList.remove('playing');
    videoRef.pause();
    return;
  }
  playBtn.classList.add('playing');
  videoRef.play();
};

if (swiperGallery) {
  swiperGallery.el.addEventListener('click', handleVideoClick);
  swiperGallery.on('slideChange', (slider) => {
    const { previousIndex, slides } = slider;
    const slide = slides[previousIndex];
    if (!slide) return;
    const videoRef = slide.querySelector('video');
    const playBtnRef = slide.querySelector('.building-swiper-video__button');
    if (!videoRef || !playBtnRef) {
      return;
    }
    videoRef.pause();
    playBtnRef.classList.remove('playing');
  });
}

if (constructionCloseBtnRef) {
  constructionCloseBtnRef.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
  });
}

if (popupOverlayRef) {
  popupOverlayRef.addEventListener('click', ({ target }) => {
    if (target.classList.contains('gallery-overlay')) {
      closePopup();
    }
  });
}

document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    closePopup();
  }
});

const constructionPopup = {
  gallery: swiperGallery,
  open: openPopup,
  close: closePopup,
  openWithSlides: openPopupWithSlides,
};

export default constructionPopup;
