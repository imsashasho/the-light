function Card(i18n, flat, favouritesIds$) {
  const imageDefault = `${window.defaultModulePath}/images/examples/no-image.png`;
  const {
    rooms,
    area,
    floor,
    type,
    number,
    price,
    status,
    sale,
    img_small: src,
    id,
  } = flat;

  const isFavourite = favouritesIds$.value.includes(id);
  return `<div class="s3d-card js-s3d-card" data-id="${id}" data-key="id" data-sale="${sale}">
      <button class="s3d__close js-s3d-card__close">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.30665 1.49862L8.00521 7.19614L7.29817 7.90331L1.59961 2.20579L2.30665 1.49862ZM15.6033 2.20579L9.90473 7.90331L9.19768 7.19614L14.8962 1.49862L15.6033 2.20579ZM8.00521 9.80248L2.30665 15.5L1.59961 14.7928L7.29817 9.09531L8.00521 9.80248ZM9.90473 9.09531L15.6033 14.7928L14.8962 15.5L9.19768 9.80248L9.90473 9.09531Z"/>
        </svg>
      </button>
      <div class="s3d-card__image">
        <img src="${src || imageDefault}" data-key="src">
        <div class="s3d-card__price">
          <span data-key="price">${price}</span> ${i18n.t('priceText')}
        </div>
         <div class="s3d-card__status">
          <span data-key="status">${status}</span>
        </div>
        <div class="s3d-card__rooms-count">
          <span data-key="rooms">${rooms}</span>${i18n.t('rooms-letter')}
        </div>
      </div>
      <div class="s3d-card__info-wrapper">
        <div class="s3d-card__title">
            <span data-key="rooms">${rooms}</span> ${i18n.t('rooms')} — <span data-key="area">${area}</span> ${i18n.t('meters-letter')}<sup>2</sup>
        </div>
        <div class="s3d-card__table">
              <div class="s3d-card__row">
                <div class="s3d-card__name">${i18n.t('floor')}:</div>
                <div class="s3d-card__value" data-key="floor">${floor}</div>
              </div>
              <div class="s3d-card__row">
                <div class="s3d-card__name">${i18n.t('type')}:</div>
                <div class="s3d-card__value" data-key="type">${type}</div>
              </div>
              <div class="s3d-card__row">
                <div class="s3d-card__name">${i18n.t('apartment--number')}:</div>
                <div class="s3d-card__value" data-key="number">${number}</div>
              </div>
        </div>
        <div class="s3d-card__buttons">
            <button type="button" class="s3d-card__link js-s3d-card__link">
              <span class="s3d-card__link-text">${i18n.t('card--link')}</span>
            </button>
            <label aria-label="button" aria-role="button" data-id="${id}" data-key="id" class="s3d__favourite js-s3d-add__favourite">
               <input type="checkbox" data-key="checked" ${isFavourite ? 'checked' : ''}/>
               <svg><use xlink:href="#icon-favourites"></use></svg>
            </label>
        </div>
      </div>
   </div>`;
}

export default Card;
