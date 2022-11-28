const arrPathMobile = document.querySelector('#layout_svg-mobile').querySelectorAll('.svg-path');
const arrPathDesctop = document.querySelector('#layout_svg-desctop').querySelectorAll('.svg-path');

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