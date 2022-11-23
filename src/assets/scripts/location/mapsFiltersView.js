export const filtersButtonView = ({ svgName, type, name }) => `
    <button class="map-navigation__button js-button-map-navigation" data-type="${type}">
        <svg class="icon--school" role="presentation">
            <use xlink:href="#${svgName}"></use>
        </svg>
        <span>${name}</span>
    </button>
      `;

export const mapsFiltersView = items => items.map(item => filtersButtonView(item)).join('');
