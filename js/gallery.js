import { showBigPicture } from './big-picture.js';

const thumbnailTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');
let pictures = [];

const createThumbnail = ({ url, description, comments, likes, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

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

export const setPictures = (data) => {
  pictures = data;
};

export const getPictures = () => pictures;

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.querySelectorAll('.picture').forEach((picture) => picture.remove());
  container.append(fragment);
};

container.addEventListener('click', onContainerClick);

