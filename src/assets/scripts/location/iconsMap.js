import schoolPin from '../../images/school-pin.svg';
import kindergardenPin from '../../images/kindergarden-pin.svg';
import recreationPin from '../../images/recreation-pin.svg';
import pharmacyPin from '../../images/pharmacy-pin.svg';
import dinningPin from '../../images/dinning-pin.svg';
import mainPin from '../../images/main-marker-pin.svg';
import gymPin from '../../images/gym-pin.svg';
import shoppingPin from '../../images/shopping-pin.svg';

const ICON_NAMES = {
  main: 'main',
  school: 'school',
  kindergarten: 'kindergarten',
  pharmacies: 'pharmacies',
  recreation: 'recreation',
  dinning: 'dinning',
  shopping: 'shopping',
  gym: 'gym',
};

export const MAP_ICONS_NAME = {
  [ICON_NAMES.main]: 'icon-map-logo',
  [ICON_NAMES.school]: 'icon-school',
  [ICON_NAMES.kindergarten]: 'icon-kindergarden',
  [ICON_NAMES.pharmacies]: 'icon-pharmacy',
  [ICON_NAMES.recreation]: 'icon-recreation',
  [ICON_NAMES.dinning]: 'icon-dinning',
  [ICON_NAMES.shopping]: 'icon-shopping',
  [ICON_NAMES.gym]: 'icon-gym',
};

export const MARKER_ICONS = {
  [ICON_NAMES.main]: mainPin,
  [ICON_NAMES.school]: schoolPin,
  [ICON_NAMES.kindergarten]: kindergardenPin,
  [ICON_NAMES.pharmacies]: pharmacyPin,
  [ICON_NAMES.recreation]: recreationPin,
  [ICON_NAMES.dinning]: dinningPin,
  [ICON_NAMES.shopping]: shoppingPin,
  [ICON_NAMES.gym]: gymPin,
};
