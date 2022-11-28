import { modalFactory } from '../gulp-modules/modal';
import Swiper from 'swiper';


const SWIPER_GALLERY = '.swiper-gallery';
const POPUP_GALLERY = '.gallery-overlay';
const CLOSE_GALLERY = '.gallery-slider__btn-close';

const constructionCloseBtnRef = document.querySelector(CLOSE_GALLERY);
const galleryModal = modalFactory(POPUP_GALLERY);

const swiperGallery = new Swiper(SWIPER_GALLERY, {
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
});

const openPopup = () => {
  galleryModal.open();
};

const closePopup = () => {
  galleryModal.close();
};

const openPopupWithSlides = (slides) => {
  openPopup();
  swiperGallery.removeAllSlides();
  swiperThumbnails.removeAllSlides();
  swiperGallery.appendSlide(slides);
  swiperThumbnails.appendSlide(slides);
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

swiperGallery.el.addEventListener('click', handleVideoClick);
swiperGallery.on('slideChange', (slider) => {
  const { previousIndex, slides } = slider;
  const slide = slides[previousIndex];
  if (!slide) return;
  const videoRef = slide.querySelector('video');
  const playBtnRef = slide.querySelector('.building-swiper-video__button');
  if (!videoRef) {
    return;
  }
  videoRef.pause();
  playBtnRef.classList.remove('playing');
});

constructionCloseBtnRef.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup();
});

export const constructionPopup = {
  gallery: swiperGallery,
  open: openPopup,
  close: closePopup,
  openWithSlides: openPopupWithSlides,
};
