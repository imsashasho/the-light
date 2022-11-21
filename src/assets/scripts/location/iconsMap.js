import schoolPin from '../../images/school-pin.svg';
import kindergardenPin from '../../images/kindergarden-pin.svg';
import hospitalPin from '../../images/hospital-pin.svg';
import recreationPin from '../../images/recreation-pin.svg';
import dinningPin from '../../images/dinning-pin.svg';
import mainPin from '../../images/main-marker-pin.svg';
import shopPin from '../../images/dinning-pin.svg';

const ICON_NAMES = {
  main: 'main',
  school: 'school',
  kindergarten: 'kindergarten',
  hospitals: 'hospitals',
  pharmacies: 'pharmacies',
  recreation: 'recreation',
  dinning: 'dinning',
  shop: 'shop',
};

export const MAP_ICONS_NAME = {
  [ICON_NAMES.main]: 'icon-main-marker',
  [ICON_NAMES.school]: 'icon-school',
  [ICON_NAMES.kindergarten]: 'icon-kindergarden',
  [ICON_NAMES.hospitals]: 'icon-pharmacy',
  [ICON_NAMES.pharmacies]: 'icon-pharmacy',
  [ICON_NAMES.recreation]: 'icon-recreation',
  [ICON_NAMES.dinning]: 'icon-dinning',
  [ICON_NAMES.shop]: 'icon-dinning',
};

export const MARKER_ICONS = {
  [ICON_NAMES.main]: mainPin,
  [ICON_NAMES.school]: schoolPin,
  [ICON_NAMES.kindergarten]: kindergardenPin,
  [ICON_NAMES.hospitals]: hospitalPin,
  [ICON_NAMES.pharmacies]: hospitalPin,
  [ICON_NAMES.recreation]: recreationPin,
  [ICON_NAMES.dinning]: dinningPin,
  [ICON_NAMES.shop]: shopPin,
};
