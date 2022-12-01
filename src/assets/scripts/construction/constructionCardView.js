export const constructionCardView = ({
  previewSrc, month, date, id,
}) => `
    <div class="construction-month__card-wrap">
        <a class="construction-month__card" href="" data-month="${month}" data-id="${id}"> 
            <div class="construction-month__card-img"> 
                <img src="${previewSrc}" alt="">
                <div class="construction-month__card-text">
                    <span class="construction-month__card-title">${month}</span>
                    <span class="construction-month__card-date">${date}</span>
                </div>
            </div>
        </a>
    </div>
    `;

export const cardsListView = items => items.map(item => constructionCardView(item)).join('');
