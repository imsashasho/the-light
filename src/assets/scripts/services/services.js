{
  const filters = document.querySelectorAll('.services-filter-btn');
  let activeFilter = filters[0];
  console.log(filters[0]);

  filters.forEach((filter) => {
    filter.addEventListener('click', (event) => {
      const selectedFilter = filter.getAttribute('data-filter');
      let itemsToHide = document.querySelectorAll(
        `.services-list .news-item:not([data-filter='${selectedFilter}'])`,
      );
      let itemsToShow = document.querySelectorAll(`.services-list [data-filter='${selectedFilter}']`);
      const { currentTarget } = event;
      currentTarget.classList.add('active');
      activeFilter.classList.remove('active');
      activeFilter = currentTarget;

      if (selectedFilter === 'all') {
        itemsToHide = [];
        itemsToShow = document.querySelectorAll('.services-list [data-filter]');
      }

      itemsToHide.forEach((el) => {
        el.classList.add('hide');
        el.classList.remove('show');
      });

      itemsToShow.forEach((el) => {
        el.classList.remove('hide');
        el.classList.add('show');
      });
    });
  });

  const newsContainer = document.querySelector('.services-list');

  async function newsRendering() {
    const sendData = new FormData();
    sendData.append('action', 'getNews');
    let newsData = await fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: sendData,
    });
    newsData = await newsData.json();
    newsContainer.innerHTML = '';

    newsData.dataSmall.forEach((card) => {
      newsContainer.innerHTML += card;
    });
  }

  newsRendering();
}
