import { constructionPopup } from '../gulp-modules/construction-gallery-popup';
import { cardsListView } from './constructionCardView';
import { getConstructionGallery } from '../api';
import { transformConstructionResponse } from './transformConstructionResponse';
import { monthListButtonsView } from './monthListButtonsView';
import { monthListSelectView } from './monthListSelectView';
import { yearListSelectView } from './yearListSelectView';
import { slidesView } from './slidesView';
import { monthDescriptionView } from './monthDescriptionView';

(async function () {
  let galleryData = [];

  try {
    const galleryResponse = await getConstructionGallery();
    galleryData = galleryResponse.data;
  } catch (error) {
    console.warn(error);
  }

  const { years, constructions } = transformConstructionResponse(galleryData);
  const yearsList = years.map(item => item.year);
  const yearListRef = document.querySelector('.construction-year');
  const monthListRef = document.querySelector('.construction-month');
  const yearListMobileRef = document.querySelector('.construction-year-mobile');
  const monthListMobileRef = document.querySelector('.construction-month-mobile');
  const constructionListRef = document.querySelector('.construction-right__inner');
  const descriptionRef = document.querySelector('.construction-description-mobile');

  const filters = {
    constructions,
    yearsList,
    years,
    cardListRef: document.querySelector('.construction-right__inner'),
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
      this.currentMonth = '';
      this.render();
      this.renderMonth();
    },
    setCurrentMonth(month) {
      this.currentMonth = this.currentMonth === month ? '' : month;
      this.render();
      this.renderMobileDescription();
    },
    render() {
      this.cardListRef.innerHTML = cardsListView(this.currentSlides);
    },
    renderMonth() {
      const currentMonths = this.years.find(item => item.year === this.currentYear);
      monthListRef.innerHTML = monthListButtonsView(currentMonths.months);
      monthListMobileRef.innerHTML = monthListSelectView(currentMonths.months);
    },
    renderMobileDescription() {
      const activeMonth = this.getActiveMonthData();
      if (!activeMonth) {
        descriptionRef.innerHTML = '';
        return;
      }
      descriptionRef.innerHTML = monthDescriptionView({ description: activeMonth.description });
    },
  };

  let activeYearRef = null;
  let activeMonthRef = null;

  const handleFilterByYear = (event) => {
    const { target } = event;
    const btnRef = target.closest('.construction-year__item');
    if (!btnRef) return;

    const { year } = btnRef.dataset;
    filters.setCurrentYear(year);
    btnRef.classList.add('active');
    if (activeYearRef) {
      activeYearRef.classList.remove('active');
    }
    activeYearRef = btnRef;
  };

  const handleMobileYearChange = (event) => {
    const { target } = event;
    const { value } = target;
    filters.setCurrentYear(value);
  };

  const handleFilterByMonth = (event) => {
    const { target } = event;
    const btnRef = target.closest('.construction-month__item');
    if (!btnRef) return;

    const { month } = btnRef.dataset;
    filters.setCurrentMonth(month);
    btnRef.classList.add('active');
    if (activeMonthRef) {
      activeMonthRef.classList.remove('active');
    }
    activeMonthRef = btnRef;
  };

  const handleMobileMonthChange = (event) => {
    const { target } = event;
    const { value } = target;
    filters.setCurrentMonth(value.toLowerCase());
  };

  const handleOpenConstructionPopup = (e) => {
    e.preventDefault();
    const { target } = e;
    const cardRef = target.closest('.construction-month__card');
    if (!cardRef) return;

    const id = +cardRef.dataset.id;
    const construction = filters.currentSlides.find(slide => slide.id === id);
    if (!construction) return;

    const slides = slidesView(construction.gallery);
    constructionPopup.openWithSlides(slides);
  };

  constructionListRef.addEventListener('click', handleOpenConstructionPopup);
  yearListRef.addEventListener('click', handleFilterByYear);
  monthListRef.addEventListener('click', handleFilterByMonth);
  yearListMobileRef.addEventListener('change', handleMobileYearChange);
  monthListMobileRef.addEventListener('change', handleMobileMonthChange);

  filters.renderMonth();
  filters.render();
}());
