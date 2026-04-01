import constructionPopup from '../gulp-modules/construction-gallery-popup';
import { cardsListView } from './constructionCardView';
import { getConstructionGallery } from '../api';
import transformConstructionResponse from './transformConstructionResponse';
import { slidesView } from './slidesView';
import { galleryIntroInnerView } from './constructionSlideDescrView';
import { createCustomSelectFromSelect } from '../common/customSelect';

(async function() {
  let galleryData = [];

  try {
    const galleryResponse = await getConstructionGallery();
    galleryData = galleryResponse.data;
  } catch (error) {
    console.warn(error);
  }

  if (!galleryData || !galleryData.data || !galleryData.filter) {
    console.warn('Construction gallery data is empty or invalid');
    return;
  }

  const { years, constructions } = transformConstructionResponse(galleryData);
  if (!years.length || !constructions.length) {
    return;
  }

  const yearsList = years.map(item => item.year);
  const yearListMobileRef =
    document.querySelector('.construction-year-mobile') || document.querySelector('#year');
  const monthListMobileRef =
    document.querySelector('.construction-month-mobile') || document.querySelector('#month');
  const constructionListRef = document.querySelector('.construction-list');
  const sliderTextRef = document.querySelector('.gallery-item-intro');
  const yearSelectorRef =
    document.querySelector('#year') || document.querySelector('.construction-year-mobile');
  const monthSelectorRef =
    document.querySelector('#month') || document.querySelector('.construction-month-mobile');
  const monthSelectorPlaceholder =
    (monthSelectorRef && monthSelectorRef.dataset.placeholder) || 'Місяць';

  if (!constructionListRef) {
    return;
  }

  let filters;

  const customMonthSelector =
    monthSelectorRef &&
    createCustomSelectFromSelect(monthSelectorRef, {
      onChange: month => {
        filters.setCurrentMonth((month || '').toLowerCase());
      },
      placeholder: monthSelectorPlaceholder,
    });

  const customYearSelector =
    yearSelectorRef &&
    createCustomSelectFromSelect(yearSelectorRef, {
      onChange: year => {
        filters.setCurrentYear(year);
      },
    });

  filters = {
    constructions,
    yearsList,
    years,
    cardListRef: document.querySelector('.construction-list'),
    currentYear: yearsList[0],
    currentMonth: '',
    get currentSlides() {
      const itemsByYear = this.constructions.filter(item => item.year === this.currentYear);

      return this.currentMonth
        ? itemsByYear.filter(slide => slide.month === this.currentMonth)
        : itemsByYear;
    },

    getSlidesById(id) {
      return this.currentSlides.filter(slide => slide.id === id);
    },

    getSlidesByMonth(month) {
      return this.currentSlides.filter(slide => slide.month === month);
    },

    getActiveMonthData() {
      if (!this.currentMonth) {
        return null;
      }
      return this.years
        .find(item => item.year === this.currentYear)
        .months.find(month => month.name.toLowerCase() === this.currentMonth);
    },
    setCurrentYear(year) {
      this.currentYear = year;
      this.currentMonth = '';

      if (customMonthSelector) {
        customMonthSelector.value = '';
      }

      this.render();
      this.renderMonth();
    },
    setCurrentMonth(month) {
      this.currentMonth = this.currentMonth === month ? '' : month;
      this.render();
    },
    render() {
      this.cardListRef.innerHTML = cardsListView(this.currentSlides);
    },
    renderMonth() {
      const currentMonths = this.years.find(item => item.year === this.currentYear);
      if (!currentMonths) {
        return;
      }
      const options = currentMonths.months.map(month => ({
        label: month.name,
        value: month.name,
      }));
      if (customMonthSelector) {
        customMonthSelector.updateOptions(options);
      }

      const activeMonthData = this.getActiveMonthData() || currentMonths.months[0];
      const descrRef = document.querySelector('.construction-progress__update-descr');
      if (descrRef && activeMonthData) {
        descrRef.innerHTML = activeMonthData.description || '';
      }
    },
  };

  if (customYearSelector) {
    customYearSelector.updateOptions(years.map(({ year }) => ({ label: year, value: year })));
    customYearSelector.value = yearsList[0];
  }

  // let activeYearRef = document.querySelector('.construction-progress__years-item.active');
  // let activeMonthRef = null;

  // const handleFilterByYear = event => {
  //   const { target } = event;
  //   const btnRef = target.closest('.construction-progress__years-item');
  //   if (!btnRef) return;

  //   const { year } = btnRef.dataset;
  //   filters.setCurrentYear(year);
  //   btnRef.classList.add('active');
  //   if (activeYearRef) {
  //     activeYearRef.classList.remove('active');
  //   }
  //   activeYearRef = btnRef;
  // };

  const handleMobileYearChange = event => {
    const { target } = event;
    const { value } = target;
    filters.setCurrentYear(value);
  };

  // const handleFilterByMonth = event => {
  //   const { target } = event;
  //   const btnRef = target.closest('.construction-month__item');
  //   if (!btnRef) return;

  //   const { month } = btnRef.dataset;
  //   filters.setCurrentMonth(month);
  //   btnRef.classList.add('active');
  //   if (activeMonthRef) {
  //     activeMonthRef.classList.remove('active');
  //   }
  //   activeMonthRef = btnRef;
  // };

  const handleMobileMonthChange = event => {
    const { target } = event;
    const { value } = target;
    filters.setCurrentMonth(value.toLowerCase());
  };

  const handleOpenConstructionPopup = e => {
    e.preventDefault();
    const { target } = e;
    const cardRef = target.closest('.construction-month__card');
    if (!cardRef) return;

    const id = +cardRef.dataset.id;
    const construction = filters.currentSlides.find(slide => slide.id === id);
    if (!construction) return;

    if (sliderTextRef) {
      sliderTextRef.innerHTML = galleryIntroInnerView(construction);
    }
    const slides = slidesView(construction.gallery);
    constructionPopup.openWithSlides(slides);
  };

  constructionListRef.addEventListener('click', handleOpenConstructionPopup);
  // yearListRef.addEventListener('click', handleFilterByYear);
  // monthListRef.addEventListener('click', handleFilterByMonth);
  if (yearListMobileRef) {
    yearListMobileRef.addEventListener('change', handleMobileYearChange);
  }
  if (monthListMobileRef) {
    monthListMobileRef.addEventListener('change', handleMobileMonthChange);
  }

  filters.renderMonth();
  filters.render();
})();
