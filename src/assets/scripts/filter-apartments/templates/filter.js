function Filter(i18n) {
  return `
  <div class="s3d-filter-wrap js-s3d-filter">
    <div class="s3d-filter__close-wrap js-s3d-filter__close">
      <div class="s3d-filter__close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70704 0.998623L7.4056 6.69614L6.69856 7.40331L1 1.70579L1.70704 0.998623ZM15.0037 1.70579L9.30512 7.40331L8.59808 6.69614L14.2966 0.998623L15.0037 1.70579ZM7.4056 9.30248L1.70704 15L1 14.2928L6.69856 8.59531L7.4056 9.30248ZM9.30512 8.59531L15.0037 14.2928L14.2966 15L8.59808 9.30248L9.30512 8.59531Z"/>
        </svg>
      </div>
    </div>
    <div class="s3d-filter__top">
      <div class="s3d-filter__title"><span>${i18n.t('Filter.title')}</span></div>
      <div class="s3d-filter">
        <div class="s3d-filter__range-wrapper">
          <div class="s3d-filter__range">
            <div class="s3d-filter__range__title">${i18n.t('floor')}</div>
            <div class="s3d-filter__range__list js-filter-range">
              <input class="js-s3d-filter__floor--input" data-type="floor" data-min="1" data-max="15" data-from="1" data-to="15">
            </div>
          </div>
          <div class="s3d-filter__range">
            <div class="s3d-filter__range__title">${i18n.t('area')} м<sup>2</sup></div>
            <div class="s3d-filter__range__list js-filter-range">
              <input class="js-s3d-filter__area--input" data-type="area" data-min="5" data-max="555" data-from="5" data-to="555">
            </div>
          </div>
        </div>
        <div class="s3d-filter__row js-s3d-filter__checkboxes">
          <div class="s3d-filter-checkboxes">
            <div class="s3d-filter__checkbox">
              <input type="checkbox" data-type="rooms" data-rooms="2" id="rooms-2">
              <label class="s3d-filter__checkbox--label" for="rooms-2">2</label>
            </div>
            <div class="s3d-filter__checkbox">
              <input type="checkbox" data-type="rooms" data-rooms="3" id="rooms-3">
              <label class="s3d-filter__checkbox--label" for="rooms-3">3</label>
            </div>
            <div class="s3d-filter__checkbox">
              <input type="checkbox" data-type="rooms" data-rooms="4" id="rooms-4">
              <label class="s3d-filter__checkbox--label" for="rooms-4">4</label>
            </div>
          </div>
          <button class="s3d-filter__reset s3d-filter__reset-desktop" type="button" id="resetFilter">
          <svg class="s3d-filter__reset-icon" role="presentation">
            <use xlink:href="#icon-reset"></use>
          </svg>
          <span>${i18n.t('Filter.reset')}</span>
        </button>
        </div>
      </div>
      <div class="s3d-filter__hide" id="hideFilter" data-hide-text="${i18n.t('Filter.hide')}" data-show-text="${i18n.t('Filter.show')}">${i18n.t('Filter.hide')}</div>
    </div>
    <div class="s3d-filter__table js-s3d-filter__table">
      <div class="s3d-filter__head js-s3d-filter__head">
          <div class="s3d-filter__tr">
            <div class="s3d-filter__th--offset" data-sort="none"></div>
            <div class="s3d-filter__th" data-sort="none">
              ${i18n.t('type')}
            </div>
            <div class="s3d-filter__th" data-sort="rooms">
              ${i18n.t('rooms')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="floor">
              ${i18n.t('floor')}
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="area">
              ${i18n.t('area')} м<sup>2</sup>
              <svg  class="s3d-sort__arrow width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4998 0.000859108L3.86416 0.388601L6.86396 3.58085C7.05306 3.78209 7.04322 4.09852 6.84199 4.28762C6.64076 4.47672 6.32433 4.46688 6.13522 4.26565L3.9998 1.99322L3.9998 13.5C3.9998 13.7761 3.77594 14 3.4998 14C3.22365 14 2.9998 13.7761 2.9998 13.5L2.9998 1.99322L0.864367 4.26565C0.675265 4.46688 0.358836 4.47672 0.157602 4.28762C-0.0436321 4.09851 -0.053467 3.78208 0.135635 3.58085L3.13543 0.388601L3.4998 0.000859108Z"/>
              </svg>
            </div>
            <div class="s3d-filter__th" data-sort="none">${i18n.t('favourite--add')}</div>
            <div class="s3d-filter__th--offset" data-sort="none"></div>
          </div>
        </div>
      <table>
        <colgroup>
          <col>
          <col span="5" ><!-- С помощью этой конструкции задаем цвет фона для первых двух столбцов таблицы-->
          <col>
        </colgroup>
        <tbody class="s3d-filter__body js-s3d-filter__body"></tbody>
      </table>
    </div>
    <div class="s3d-filter__grid js-s3d-filter__grid">
      
    </div>
    <div class="s3d-filter__amount-flat">${i18n.t('found')}
    <span class="s3d-filter__amount-flat__num js-s3d__amount-flat__num">25</span>
    ${i18n.t('found--from')}
    <span class="s3d-filter__amount-flat__num js-s3d__amount-flat__num-all">456</span></div>
    <a href="https://smarto.com.en" class="smarto_logo filter-smarto_logo" target="_blank">
      <img src="${defaultModulePath}/images/icon/smarto.svg">
    </a> 
  </div>
`;
}

export default Filter;
