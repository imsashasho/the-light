export const modalFactory = ref => ({
  element: typeof ref === 'string' ? document.querySelector(ref) : ref,
  open() {
    this.element.classList.add('modal-open');
  },
  close() {
    this.element.classList.remove('modal-open');
  },
  toggle() {
    this.element.classList.toggleClass('modal-open');
  },
});
