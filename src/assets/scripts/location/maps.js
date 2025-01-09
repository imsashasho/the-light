import mapStyles from './style.json';
import { getMarkers } from '../api';
import { MARKER_ICONS, MAP_ICONS_NAME } from './iconsMap';
import { mapsFiltersView } from './mapsFiltersView';

const mapSrc =
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxK12fUzstWEjwLBlJU_ZxJE8fUAeH48I';

const mapScript = document.createElement('script');
mapScript.src = mapSrc;

document.body.appendChild(mapScript);

mapScript.onload = () => {
  initMap();
};

async function initMap() {
  let markers = [];
  try {
    const mapResponse = await getMarkers();
    markers = mapResponse.data;
  } catch (error) {
    console.warn(error);
  }

  const locations = markers.flatMap(item =>
    item.list.map(marker => {
      const { coordinations, name } = marker;
      return {
        type: item.code,
        title: name,
        coords: [coordinations.latitude, coordinations.elevation],
      };
    }),
  );

  // const mainMarkerData = markers.find(item => item.type === 'main');
  const mainMarker = {
    type: 'main',
    coords: [50.41461521600195, 30.5289853423287],
    name: 'жк the Light',
  };
  // const mainMarkerCoords = mainMarkerData.coords.split(', ');
  // const uluru = { lat: +mainMarkerCoords[0], lng: +mainMarkerCoords[1] };
  const uluru = { lat: +mainMarker.coords[0], lng: +mainMarker.coords[1] };
  const infoWindow = new google.maps.InfoWindow();
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
    styles: mapStyles,
  });
  window.googleMap = map;
  const marker = new google.maps.Marker({
    position: uluru,
    map,
    icon: MARKER_ICONS.main,
  });
  const DIRECTIONS_SERVIE = new google.maps.DirectionsService();
  const DIRECTIONS_RENDERER = new google.maps.DirectionsRenderer({ map });
  const locationsWithMarkers = locations.map(item => {
    const iconUrl = MARKER_ICONS[item.type];
    const marker = new google.maps.Marker({
      position: {
        lat: +item.coords[0],
        lng: +item.coords[1],
      },
      map,
      icon: iconUrl,
      title: item.title,
    });
    marker.addListener('click', () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });

    google.maps.event.addListener(marker, 'click', function(evbt) {
      DIRECTIONS_SERVIE.route(
        {
          origin: new google.maps.LatLng(mainMarker.coords[0], mainMarker.coords[1]),
          destination: new google.maps.LatLng(item.coords[0], item.coords[1]),
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true,
        },
        (res, status) => {
          console.log(res);
          console.log(status);
          DIRECTIONS_RENDERER.setDirections(res);
        },
      );

      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
      map.panTo(this.getPosition());
      DIRECTIONS_SERVIE.route();
    });

    return { ...item, marker };
  });

  const mapFiltersRef = document.querySelector('.map-navigation__main');
  const filterMarkersListRef = document.querySelector('.map-navigation__markers');
  let activeFilterRef = null;

  const filterMarkers = type => {
    if (type === null) {
      locationsWithMarkers.forEach(location => {
        location.marker.setMap(map);
      });
      return locationsWithMarkers;
    }

    return locationsWithMarkers.filter(location => {
      if (location.type === type) {
        location.marker.setMap(map);
      } else {
        location.marker.setMap(null);
      }
      return location.type === type;
    });
  };

  const renderMapFilters = markers => {
    const filters = markers.map(marker => {
      const { code, name } = marker;
      return { svgName: MAP_ICONS_NAME[code], type: code, name };
    });
    mapFiltersRef.innerHTML = mapsFiltersView(filters);
  };

  const handleFilterChange = e => {
    const { target } = e;
    const btn = target.closest('.map-navigation__button');

    if (!btn) return;
    const { type } = btn.dataset;

    if (activeFilterRef && activeFilterRef.dataset.type === type) {
      btn.classList.remove('active');
      filterMarkersListRef.classList.remove('active');
      filterMarkers(null);
      activeFilterRef = null;
      return;
    }

    const items = filterMarkers(btn.dataset.type);
    const markersList = items.map(item => {
      const button = document.createElement('button');
      button.classList.add('map-marker-active');
      button.addEventListener('click', () => {
        google.maps.event.trigger(item.marker, 'click', {
          latLng: item.marker.getPosition(),
        });
      });
      button.textContent = item.title;
      return button;
    });

    activeFilterRef && activeFilterRef.classList.remove('active');
    btn.classList.add('active');
    filterMarkersListRef.innerHTML = '';
    filterMarkersListRef.append(...markersList);
    filterMarkersListRef.classList.add('active');
    activeFilterRef = btn;
  };

  mapFiltersRef.addEventListener('click', handleFilterChange);
  renderMapFilters(markers);
}
