import { showAlert } from './util.js';
import { renderGallery } from './gallery.js';
import { setOnFormSubmit, hideImageForm } from './image-edit-form.js';
import { getData } from './api.js';
import './scale.js';
import './effects.js';
import './message.js';

getData()
  .then((userImages) => renderGallery(userImages))
  .catch((err) => showAlert(err));

setOnFormSubmit(hideImageForm);
