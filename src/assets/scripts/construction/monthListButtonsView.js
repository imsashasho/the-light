export const monthButtonView = ({ name, description }) => `
        <div class="construction-month__item construction-progress__months-item" data-month="${name.toLowerCase()}">
            <span>${name}</span>
        </div>
      `;
export const monthListButtonsView = items => items.map(item => monthButtonView(item)).join('');
