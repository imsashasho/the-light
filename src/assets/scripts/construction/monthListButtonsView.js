export const monthButtonView = ({ name, description }) => `
        <div class="construction-month__item" data-month="${name.toLowerCase()}">
            <span>${name}</span>
            <div class="construction-month__left-hint">
                <img src="https://romankiv-wp.smarto.com.ua/wp-content/themes/romankiv/assets/images/white-leaf-small.svg" alt="">
            </div>
            <div class="construction-month__right-hint">
                <p>${description}</p>
            </div>
        </div>
      `;
export const monthListButtonsView = items => items.map(item => monthButtonView(item)).join('');
