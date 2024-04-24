import { showDialog } from './modals.js';
import { renderGallery } from './gallery.js';
import { onSubmitForm } from './uploading-image.js';
import { getData } from './api.js';
import './scale.js';
import './effects.js';
import './modals.js';

getData()
  .then((userImages) => renderGallery(userImages))
  .catch(() => showDialog('error'));

onSubmitForm();
