/* eslint-disable no-use-before-define */
const SHOW_BY_5 = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

let comments = [];
let commentsShows = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35">';
  comment.insertAdjacentHTML('beforeend', '<p class="social__text"></p>');
  comment.querySelector('.social__text').textContent = message;
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.classList.add('social__comment');

  return comment;
};

const renderPhotoDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const renderComments = () => {
  commentsShows += SHOW_BY_5;

  if (commentsShows >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShows = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShows; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsCount.innerHTML = `${commentsShows} из <span class="comments-count">${comments.length}</span> комментариев`;
  commentsList.append(fragment);
};

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShows = 0;
};

const onCancelButtonClick = () => hideBigPicture();
const onCommentsLoaderClick = () => renderComments();

bigPictureCancel.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);
