export const galleryIntroInnerView = ({
    month, monthString, year, day, descr,
  }) => `
        <div class="gallery-item__title">
            <span class="gallery-item__title-day"> ${day}
        </span>
        <div class="gallery-item__title-inner">
            <span class="gallery-item__title-month">${monthString}
            </span>
            <span class="gallery-item__title-year"> ${year}
            </span>
        </div>
        </div>

        <div class="gallery-item__descr">
            <p>${descr}</p>
        </div>
      `;
  
  export const galleryIntroView = items => items.map(item => galleryIntroInnerView(item)).join('');