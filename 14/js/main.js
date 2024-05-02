import { renderGallery } from './gallery.js';
import { onSubmitForm } from './image-form.js';
import { getData } from './api.js';
import './scale.js';
import './effects.js';
import { showAlert } from './modals.js';
import { init, getFilteredPictures } from './filter.js';
import { debounce } from './util.js';

const debouncedRenderGallery = debounce(renderGallery);

getData()
  .then((pictures) => {
    init(pictures, debouncedRenderGallery);
    renderGallery(getFilteredPictures());
  })
  .catch(() => {
    showAlert();
  });

onSubmitForm();
