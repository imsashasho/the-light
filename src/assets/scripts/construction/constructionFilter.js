import { constructionPopup } from '../gulp-modules/construction-gallery-popup';
import { cardsListView } from './constructionCardView';
import { getConstructionGallery } from '../api';
import { transformConstructionResponse } from './transformConstructionResponse';
import { monthListButtonsView } from './monthListButtonsView';
import { monthListSelectView } from './monthListSelectView';
import { slidesView } from './slidesView';
import { galleryIntroInnerView } from './constructionSlideDescrView';
import { createCustomSelect, createCustomSelectFromSelect } from './../common/customSelect';

(async function() {
  let galleryData = [];

  try {
    const galleryResponse = await getConstructionGallery();
    galleryData = galleryResponse.data;
  } catch (error) {
    console.warn(error);
  }

  const { years, constructions } = transformConstructionResponse(galleryData);
  const yearsList = years.map(item => item.year);
  const yearListRef = document.querySelector('.construction-progress__years-list');
  const monthListRef = document.querySelector('.construction-progress__months-list');
  const yearListMobileRef = document.querySelector('.construction-year-mobile');
  const monthListMobileRef = document.querySelector('.construction-month-mobile');
  const constructionListRef = document.querySelector('.construction-list');
  const sliderTextRef = document.querySelector('.gallery-item-intro');
  const yearSelectorRef = document.querySelector('#year');
  const monthSelectorRef = document.querySelector('#month');
  const monthSelectorPlaceholder = monthSelectorRef.dataset.placeholder;

  const customMonthSelector = createCustomSelectFromSelect(monthSelectorRef, {
    onChange: month => {
      filters.setCurrentMonth(month.toLowerCase());
    },
    placeholder: monthSelectorPlaceholder,
  });

  const customYearSelector = createCustomSelectFromSelect(yearSelectorRef, {
    onChange: year => {
      filters.setCurrentYear(year);
    },
  });

  const filters = {
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
        return;
      }
      return this.years
        .find(item => item.year === this.currentYear)
        .months.find(month => month.name.toLowerCase() === this.currentMonth);
    },
    setCurrentYear(year) {
      this.currentYear = year;
      console.log(this.currentYear);
      this.currentMonth = '';
      this.render();
      this.renderMonth();
    },
    setCurrentMonth(month) {
      this.currentMonth = this.currentMonth === month ? '' : month;
      this.render();
    },
    render() {
      console.log(this.currentMonth);
      console.log('slides', this.currentSlides);
      this.cardListRef.innerHTML = cardsListView(this.currentSlides);
    },
    renderMonth() {
      const currentMonths = this.years.find(item => item.year === this.currentYear);
      console.log(currentMonths);
      const options = currentMonths.months.map(month => {
        return {
          label: month.name,
          value: month.name,
        };
      });
      console.log(customMonthSelector);
      customMonthSelector.updateOptions(options);
    },
  };

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

    sliderTextRef.innerHTML = galleryIntroInnerView(construction);
    const slides = slidesView(construction.gallery);
    constructionPopup.openWithSlides(slides);
  };

  constructionListRef.addEventListener('click', handleOpenConstructionPopup);
  // yearListRef.addEventListener('click', handleFilterByYear);
  // monthListRef.addEventListener('click', handleFilterByMonth);
  yearListMobileRef.addEventListener('change', handleMobileYearChange);
  monthListMobileRef.addEventListener('change', handleMobileMonthChange);

  filters.renderMonth();
  filters.render();
})();
