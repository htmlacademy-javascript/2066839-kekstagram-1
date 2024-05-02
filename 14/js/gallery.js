import { renderThumbnails } from './render-thumbnails.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');
let pictures = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');

  if (!thumbnail) {
    return;
  }

  const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);

  if (!picture) {
    return;
  }

  showBigPicture(picture);
};

export const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures);
  container.addEventListener('click', onContainerClick);
};


