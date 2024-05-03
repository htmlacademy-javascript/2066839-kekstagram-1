import { renderGallery, setPictures } from './gallery.js';
import { getData } from './api.js';
import './image-form.js';
import './scale.js';
import './effects.js';
import { showAlert } from './modals.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    setPictures(pictures);
    initFilters();
    renderGallery(pictures);
  })
  .catch(() => {
    showAlert();
  });
