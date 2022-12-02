export const constructionCardView = ({
  previewSrc, month, date, id, year, day, descr,
}) => `
    
        <div class="construction-month__card construction-item" href="" data-month="${month}" data-id="${id}"> 
            <div class="construction-item-intro">
                <div class="construction-item__title">
                    <span class="construction-item__title-day"> ${day}
                    </span>
                    <div class="construction-item__title-inner">
                        <span class="construction-item__title-month">${month}
                        </span>
                        <span class="construction-item__title-year"> ${year}
                        </span>
                    </div>
                </div>
                
                <div class="construction-item__descr">
                    <p>${descr}</p>

                </div>
                <div class="construction-item__details">
                    <span class="construction-item__details-photo"> ${year}
                    </span>
                    <span class="construction-item__details-videos"> ${year}
                    </span>
                </div>

            </div> 
            
            <div class="construction-item__details-img">
                <img src="${previewSrc}", alt="">
            </div>
        </div>
            
        
        
    `;

export const cardsListView = items => items.map(item => constructionCardView(item)).join('');
