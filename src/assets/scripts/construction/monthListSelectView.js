export const monthOptionsView = ({ name, value }) => {
  const selectValue = value || value === '' ? value : name;
  return `
            <option value="${selectValue}">${name}</option>
        `;
};
export const monthListSelectView = items => [{ name: 'Місяць', value: '' }, ...items].map(item => monthOptionsView(item)).join('');
