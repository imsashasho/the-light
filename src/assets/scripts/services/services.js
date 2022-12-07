{
  const filters = document.querySelectorAll('.services-filter-btn');
  const filtersMobRef = document.getElementById('filter-select');
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  let activeFilter = filters[0];
  console.log(filters[0]);

  filters.forEach((filter) => {
    filter.addEventListener('click', (event) => {
      const selectedFilter = filter.getAttribute('data-type');
      let itemsToHide = document.querySelectorAll(
        `.services-list .services-card:not([data-type='${selectedFilter}'])`,
      );
      let itemsToShow = document.querySelectorAll(`.services-list [data-type='${selectedFilter}']`);
      const { currentTarget } = event;
      currentTarget.classList.add('active');
      activeFilter.classList.remove('active');
      activeFilter = currentTarget;

      if (selectedFilter === 'all') {
        itemsToHide = [];
        itemsToShow = document.querySelectorAll('.services-list [data-type]');
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


  

if (mediaQuery.matches) {



    const handleClickChange = (e) => {
      const { target } = e;
      const btn = target.options[target.selectedIndex];
      console.log(btn)
      if (btn) {
        const selectedFilter = btn.dataset.type;
        let itemsToHide = document.querySelectorAll(
          `.services-list .services-card:not([data-type='${selectedFilter}'])`,
        );
        let itemsToShow = document.querySelectorAll(`.services-list [data-type='${selectedFilter}']`);
        const { currentTarget } = event;
        currentTarget.classList.add('active');
        activeFilter.classList.remove('active');
        activeFilter = currentTarget;

        if (selectedFilter === 'all') {
          itemsToHide = [];
          itemsToShow = document.querySelectorAll('.services-list [data-type]');
        }

        itemsToHide.forEach((el) => {
          el.classList.add('hide');
          el.classList.remove('show');
        });

        itemsToShow.forEach((el) => {
          el.classList.remove('hide');
          el.classList.add('show');
        });
      }
    };
  
    filtersMobRef.addEventListener('change', handleClickChange);
 
}

  

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
