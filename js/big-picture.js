const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const createComment = ({avatar, name, message}) => {
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

const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });
  commentsList.append(fragment);
};

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('.modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  renderPhotoDetails(data);
  renderComments(data.comments);
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
};

const onCancelButtonClick = () => {
  hideBigPicture();
};

bigPictureCancel.addEventListener('click', onCancelButtonClick);
