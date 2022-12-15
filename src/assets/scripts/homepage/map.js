import mapStyles from '../location/style.json';
import { getMarkers } from '../api';
import { MARKER_ICONS } from './iconsMap';

const mapSrc = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxK12fUzstWEjwLBlJU_ZxJE8fUAeH48I';

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

  const locations = markers.flatMap(item => item.list.map((marker) => {
    const { coordinations, name } = marker;
    return {
      type: item.code,
      title: name,
      coords: [coordinations.latitude, coordinations.elevation],
    };
  }));

  // const mainMarkerData = markers.find(item => item.type === 'main');
  const mainMarker = {
    type: 'main',
    coords: [50.41461521600195, 30.5289853423287],
    name: 'The Light',
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
}
