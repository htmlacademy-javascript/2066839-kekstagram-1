import { renderGallery } from './gallery.js';
import { onSubmitForm } from './image-form.js';
import { getData } from './api.js';
import './scale.js';
import './effects.js';
import { showAlert } from './modals.js';

getData()
  .then((userImages) => {
    renderGallery(userImages);
  })
  .catch(() => {
    showAlert();
  });

onSubmitForm();
