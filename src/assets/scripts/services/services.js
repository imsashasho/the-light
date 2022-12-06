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

  const servicesContainerRef = document.querySelector('.services-list');

  async function servicesRendering() {
    const sendData = new FormData();
    sendData.append('action', 'services');
    let servicesData = await fetch('/wp-admin/admin-ajax.php', {
      method: 'POST',
      body: sendData,
    });
    servicesData = await servicesData.json();
    servicesContainerRef.innerHTML = '';

    servicesData.forEach((card) => {
      servicesContainerRef.innerHTML += card;
    });
  }

  servicesRendering();
}
