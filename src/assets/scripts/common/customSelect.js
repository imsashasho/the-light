export const createCustomSelectFromSelect = (selectRef, options) => {
  const { onChange, placeholder } = options || {};

  if (!selectRef) {
    console.warn('Dom node doesnt exist');
    return;
  }
  const rootRef = document.createElement('div');
  rootRef.classList.add('custom-select-container');

  const { value } = selectRef;

  const selectOptions = Array.from(selectRef.querySelectorAll('option')).map(
    ({ value, textContent }) => ({
      value,
      label: textContent,
    }),
  );

  selectRef.replaceWith(rootRef);

  const select = customSelect({
    options: selectOptions,
    value,
    root: rootRef,
    onChange,
    placeholder,
  });
  select.render();

  return select;
};

const customSelect = ({ options, onChange, placeholder, value, initialLabel, isOpen, root }) => {
  return {
    _isOpen: !!isOpen,
    _value: value || '',
    _options: options,
    _mounted: false,

    el: root,

    get options() {
      return this._options;
    },
    set options(value) {
      this._options = value;
      this.render();
    },

    get isOpen() {
      return this._isOpen;
    },
    set isOpen(value) {
      this._isOpen = value;
      this.render();
    },

    get value() {
      console.log('value', this._value);
      console.log('place', placeholder);
      return this._value || placeholder;
    },
    set value(value) {
      this._value = value;
      onChange && onChange(this._value);
      this.render();
    },

    get selectedLabel() {
      const activeOption = this.options.find(option => option.value === this.value);

      return activeOption ? activeOption.label : placeholder || '';
    },

    handleChange(value) {
      this.value = value;
      this.isOpen = false;
    },

    updateOptions(options) {
      this.options = options;
    },

    handleClickOutside({ target }) {
      console.log(this.el.classList[0], target.classList[0]);
      console.log(target.closest('.custom-select-container'));
      if (target.closest('.custom-select-container') || !this.isOpen) return;

      this.isOpen = false;
    },

    render() {
      this.el.innerHTML = '';
      const view = customSelectView({
        options: this.options,
        isOpen: this.isOpen,
        label: this.selectedLabel,
        onChange: value => this.handleChange(value),
        onToggle: () => {
          this.isOpen = !this.isOpen;
        },
      });

      this.el.append(view);

      /*  if(!this._mounted) {
          this._mounted = true;
          document.addEventListener('click', this.handleClickOutside.bind(this))
        } */
    },
  };
};

const customSelectOption = ({ option, onClick }) => {
  const { value, label } = option;
  const optionRef = document.createElement('div');
  optionRef.classList.add('custom-option');
  optionRef.textContent = label;

  optionRef.addEventListener('click', () => {
    onClick(value);
  });

  return optionRef;
};

const customSelectView = ({ options, label, isOpen, onChange, onToggle }) => {
  const selectWrapperRef = document.createElement('div');
  selectWrapperRef.classList.add('custom-select-wrapper');
  const selectLabelRef = document.createElement('button');
  selectLabelRef.textContent = label;
  selectLabelRef.classList.add('custom-select-label');
  const selectOptionsRef = document.createElement('div');
  selectOptionsRef.classList.add('custom-select-options');
  const optionsList = options.map(option => customSelectOption({ option, onClick: onChange }));

  selectOptionsRef.append(...optionsList);
  selectWrapperRef.append(selectLabelRef);

  if (isOpen) {
    selectWrapperRef.append(selectOptionsRef);
  }

  selectLabelRef.addEventListener('click', onToggle);

  return selectWrapperRef;
};
