// ------------------------ btn-back-to-top -------------------
document.querySelector('.btn-back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });