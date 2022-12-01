export const yearOptionsView = ({ year }) => `
              <option value="${year}">${year}</option>
          `;
export const yearListSelectView = items => items.map(item => yearOptionsView(item)).join('');
