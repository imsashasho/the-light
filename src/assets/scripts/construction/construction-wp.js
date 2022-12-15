/* eslint-disable linebreak-style */

/**
 * @param {Object} props
 * @namespace
 * @property {NodeElement}  props.content           - Контент попапа.
 * @property {NodeList}  props.call       - Кнопка вызова попапа
 * @property {Object}  props.styles         - Стили попапа.
 * @property {NodeElement}  [props.close]      - Кнопка закрытия.
 * @property {Function}  props.afterOpenCb - Коллбек после первого открытия попапа.
 */
class Popup {
  constructor(props) {
    this.call = props.call;
    this.overlayClass = 'my-popup-overlay';
    this.uniqueClass = `${this.overlayClass}-${Math.random().toString().replace('.', '')}`;
    this.styles = props.styles || {};
    this.content = props.content;
    this.close = props.close;
    this.afterOpenCb = props.afterOpenCb || function () {};
    this.init();
  }

  init() {
    document.body.insertAdjacentHTML('beforeend', this.preparePopup());
    this.mountedPopup = document.querySelector(`.${this.uniqueClass}`);
    Object.entries(this.styles).forEach((el) => {
      // eslint-disable-next-line prefer-destructuring
      this.mountedPopup.style[el[0]] = el[1];
    });
    this.addContent();
    this.handleCallButton();
    this.mountedPopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this.uniqueClass)) {
        this.closePopup();
      }
    });
    this.close.addEventListener('click', () => {
      this.closePopup();
    });
    this.afterOpenCb();
  }

  handleCallButton() {
    // eslint-disable-next-line no-prototype-builtins
    if (NodeList.prototype.isPrototypeOf(this.call)) {
      this.call.forEach((button) => {
        button.addEventListener('click', () => {
          this.openPopup();
        });
      });
    } else {
      this.call.addEventListener('click', () => {
        this.openPopup();
      });
    }
  }

  // handleOpeningButtons
  addContent() {
    this.mountedPopup
      .querySelector('.my-popup-content')
      .insertAdjacentElement('beforeend', this.content);
  }

  closePopup() {
    gsap.timeline()
      .timeScale(2)
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { y: 0, autoAlpha: 1 },
        { y: -100, autoAlpha: 0 },
      )
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 1 },
        { autoAlpha: 0 },
      )
      .set(this.mountedPopup, { display: 'none' });
    this.opened = false;
  }

  openPopup() {
    gsap.timeline()
      .timeScale(1.5)
      .set(this.mountedPopup, { display: 'flex' })
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
      )
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { y: -100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
      )
      .add(() => {
        this.afterOpenCb();
        window.dispatchEvent(new Event('popup-opened'));
        this.opened = true;
      });
  }

  get popupStyles() {
    return `
        <style>
          .my-popup-overlay {
            position:fixed;
            display: none;
            left:0;
            top:0;
            width:100vw;
            height: 100vh;
            justify-content:center;
            align-items: center;
            z-index:10;
          }
        </style>
      `;
  }

  preparePopup() {
    return `
        <div class="my-popup-overlay ${this.uniqueClass}">
          <div class="my-popup-content">
          </div>
        </div>
        ${this.popupStyles}
      `;
  }
}

const popupContentInit = {
  title: 'Title',
  url: 'https://google.com',
};

const cards = document.querySelectorAll('[data-open]');

const renderTargets = {
  title: (val) => {
    document.querySelector('[data-detail-title]').innerHTML = val;
  },
  text: (val) => {
    document.querySelector('[data-detail-text]').innerHTML = val;
  },
  date: (val) => {
    document.querySelector('[data-detail-date]').innerHTML = val;
  },
  url: (val) => {
    document.querySelector('[data-detail-frame]').src = val;
  },
};

const buildPopup = new Popup({
  call: cards,
  content: document.querySelector('[data-build-progress]'),
  close: document.querySelector('[data-close]'),
});

const popupContent = new Proxy(popupContentInit, {
  set(obj, prop, value) {
    renderTargets[prop](value);
    return true;
  },
});


// cards.forEach((card, index) => {
//     card.addEventListener('click', () => {
//         requestBuildDetails(card.dataset.id, (response) => {
//             popupContent.date = response[index].data.month;
//             popupContent.title = response[index].data.title;
//             popupContent.text = response[index].data.text;
//             popupContent.url = response[index].data.video;
//         });
//         document.body.style.overflow = 'visible';
//     });
// });

// // buildPopup.close.addEventListener('click', () => {
// //     document.body.style.overflow = 'hidden';
// // });


function requestBuildDetails(id, cb = () => {}) {
  const sendData = new FormData();
  sendData.append('action', 'Constructions');
  sendData.append('id', id);
  let sendUrl = '/wp-admin/admin-ajax.php';
  if (window.location.href.match(/localhost/)) sendUrl = './static/build-test.php';
  fetch(sendUrl, {
    method: 'POST',
    body: sendData,
  })
    .then(el => el.json())
    .then((el) => {
      cb(el);
    });
}
const swiper2 = new Swiper('.mySwiper2', {
  loop: false,
  spaceBetween: 5,
  slidesPerView: 4,
  width: 400,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,

  breakpoints: {
    320: {
      width: 300,
    },
    575: {
      width: 400,
    },
  },
});
const swiper = new Swiper('.mySwiper', {
  loop: false,
  spaceBetween: 0,
  slidesPerView: 1,
  centeredSlides: true,
  navigation: {
    // nextEl: '.swiper-button-const-next',
    // prevEl: '.swiper-button-const-prev',
  },
  thumbs: {
    swiper: swiper2,
  },
});

/** СТрелка переключатель в зависимости от положения на єкране */
window.addEventListener('popup-opened', () => {
  swiper2.update();
  swiper.update();
});
function sideSwitchArrow(swiper, arrow, container) {
  const mediumCordValue = document.documentElement.clientWidth / 2;
  document.body.append(arrow);
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.zIndex = 10;
  arrow.__proto__.hide = function () {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function () {
    this.style.opacity = '1';
    // this.style.pointerEvents = 'auto';
  };
  arrow.dataset.side = 'leftSide';

  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
  });
  if (document.documentElement.clientWidth < 769) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }

  /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
  /** ms ---> main-screen */

  function desktopNavButtonHandler(evt) {
    // arrow.style.position = 'fixed';
    arrow.style.left = `${evt.clientX - 18}px`;
    arrow.style.top = `${evt.clientY - 18}px`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }

  function handleArrowVisibility() {}

  function getCursorSide(x) {
    if (x < mediumCordValue) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
      // switchGallerySlide('leftSide');
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
      // switchGallerySlide('rightSide')
    }
  }
  container.addEventListener('click', () => {
    switchGallerySlide(arrow.dataset.side);
  });
  if (document.documentElement.clientWidth < 576) {
    container.removeEventListener('click', clickToChange);
  }
  const navigate = {
    leftSide: () => {
      swiper.slidePrev();
    },
    rightSide: () => {
      swiper.slideNext();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }

  // eslint-disable-next-line no-unused-vars
}
sideSwitchArrow(
  swiper,
  document.querySelector('.moving-arrow'),
  document.querySelector('.swiper '),
);
/** СТрелка переключатель в зависимости от положения на єкране END */


async function getDataForRenderCards() {
  const body = new FormData();
  body.append('action', 'Constructions');
  const data = await fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    body,
  });
  const response = await data.json();
  console.log(response);
  return response;
}

function getCardTemplate(data) {
  const concatedData = `${data.data.day}.${data.data.month_in_digits}.${data.data.year}`;
  return `
        <div class="card__wrapper">
            <div data-id="${data.id}" class="card" data-open>
                <div class="block-info-text">${concatedData}</div>
                <img src="${data.data.gallery[0]}" title="foto" alt="foto"/>
            </div>
        </div>
    `;
}
function getSingleSlideForPopup(gallery) {
  return gallery.map(photo => `
        <div class="swiper-slide"><img src="${photo}" alt="progress"></div>
        `).join('');
}

async function renderCards() {
  let startIndex = 0;
  const portion = 6;
  const cardsContainer = document.querySelector('[data-cards-container]');
  cardsContainer.querySelectorAll('.card__wrapper').forEach(el => el.remove());
  const ajaxCards = await getDataForRenderCards();
  const $loadMore = document.querySelector('.button-load');
  $loadMore.addEventListener('click', (evt) => {
    for (i = startIndex; i < startIndex + portion; i++) {
      const card = ajaxCards[i];
      if (card === undefined) {
        $loadMore.style.display = 'none';
        break;
      }
      cardsContainer.insertAdjacentHTML('afterbegin', getCardTemplate(card));
    }
    startIndex += portion;
    locoScroll.update();
  });

  for (i = startIndex; i < startIndex + portion; i++) {
    const card = ajaxCards[i];
    if (card === undefined) {
      $loadMore.style.display = 'none';
      break;
    }
    cardsContainer.insertAdjacentHTML('afterbegin', getCardTemplate(card));
  }
  startIndex += portion;
  locoScroll.update();
  cardsContainer.addEventListener('click', ({ target }) => {
    if (target.closest('[data-id]') === null) return;
    const $renderedCards = document.querySelectorAll('[data-id]');
    const indexOfCurrentTarget = Array.from($renderedCards).indexOf(target.closest('[data-id]'));
    const cardId = +target.closest('[data-id]').dataset.id;
    const thisCardData = ajaxCards.find(el => el.id === cardId);
    /** Обновление контента в попапе (тайтл, картинки в слайдере и т.д) */
    popupContent.date = `${thisCardData.data.day}.${thisCardData.data.month_in_digits}.${thisCardData.data.year}`;
    popupContent.title = thisCardData.data.month;
    !buildPopup.opened && buildPopup.openPopup();
    const galleryLayout = getSingleSlideForPopup(thisCardData.data.gallery);
    swiper.wrapperEl.innerHTML = galleryLayout;
    swiper2.wrapperEl.innerHTML = galleryLayout;
    swiper.update();
    swiper2.update();
    /** END Обновление контента в попапе (тайтл, картинки в слайдере и т.д) */

    const prevInPoup = document.querySelector('[data-popup-icon-prev]');
    const nextInPoup = document.querySelector('[data-popup-icon-next]');

    prevInPoup.onclick = () => {
      if ($renderedCards[indexOfCurrentTarget - 1] === undefined) return;
      console.log('prev');
      $renderedCards[indexOfCurrentTarget - 1].click();
    };
    nextInPoup.onclick = () => {
      if ($renderedCards[indexOfCurrentTarget + 1] === undefined) return;
      $renderedCards[indexOfCurrentTarget + 1].click();
    };
  });
  return ajaxCards;
}


renderCards();
