function filterByCategories() {
    document.querySelectorAll('[data-type]').forEach((el) => {
      const key = el.dataset.type;
      el.style.display = currentCategories.has(key) || currentCategories.has('all') ? '' : 'none';
    });
  }
  
  function filterItems(items, filterConfig) {
    console.log(items, filterConfig);
    items.forEach((card) => {
      let validFlatsCount = 0;
      Object.entries(filterConfig).forEach((filterValue) => {
        const [key, value] = filterValue;
        if (value === 'null') {
          validFlatsCount += 1;
          return;
        }
        if (card.dataset[key] === value) {
          validFlatsCount += 1;
        }
      });
  
      card.style.display = validFlatsCount === Object.entries(filterConfig).length ? '' : 'none';
    });
  }
  
  export const initFilter = () => {
    const currentCategories = {};
    const filterCards = document.querySelectorAll('[data-filter-item]');
    const inputsForFilter = document.querySelectorAll('[data-type]');
    const selects = document.querySelectorAll('[data-select]');
  
    selects.forEach((select) => {
      currentCategories[select.dataset.type] = '';
      const inputsForFilter = select.querySelector('input');
      const currentSelectValue = select.querySelector('[class*="--selected"]');
      currentCategories[select.dataset.type] = currentSelectValue.dataset.value;
      select.querySelector('ul').addEventListener('click', (evt) => {
        console.log(evt.target);
        if (evt.target.dataset.value === undefined) return;
        currentCategories[select.dataset.type] = evt.target.dataset.value;
        currentSelectValue.textContent = evt.target.textContent;
  
        window.dispatchEvent(new CustomEvent('filtering', {
          detail: currentCategories,
          selectorForUse: '[data-filter-item]'
        }))
        filterItems(filterCards, currentCategories);
      });
    });
  };
  