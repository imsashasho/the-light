import axios from 'axios';
import { mockDataConstruction, mapMock, galleryMock } from './mock';

const wpAjaxUrl = window.thelightApi && window.thelightApi.ajaxUrl;
const baseUrl = wpAjaxUrl || '/wp-admin/admin-ajax.php';
const isStaticDev = !wpAjaxUrl && !!window.location.href.match('localhost');

export const getMarkers = () => {
  return isStaticDev ? Promise.resolve({ data: mapMock }) : axios.post(baseUrl, { action: 'map' });
};

export const getConstructionGallery = () => {
  return isStaticDev
    ? Promise.resolve({ data: mockDataConstruction })
    : axios.post(baseUrl, new URLSearchParams({ action: 'constructions' }));
};

export const getGalleryById = id => {
  return isStaticDev
    ? Promise.resolve({ data: galleryMock })
    : axios.post(baseUrl, { action: 'gallery', id });
};
