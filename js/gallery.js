import { renderThumbnails } from './render-thumbnails.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

export const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);

    if (!picture) {
      return;
    }

    showBigPicture(picture);
  });

  renderThumbnails(pictures);
};

