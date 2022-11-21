// ================== loader ============================

const mask = document.querySelector('.mask');

window.addEventListener('load', () => {
  mask.classList.add('mask-hide');
  document.getElementsByTagName('body')[0].classList.remove('modal-open');
  setTimeout(() => {
    mask.remove();
  }, 1000);
});
