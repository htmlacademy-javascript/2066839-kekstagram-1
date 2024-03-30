const bigPicture = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCommentTemplate = document.querySelector('#social-comment')
  .content
  .querySelector('.social__comment');

const createComment = ({ avatar, name, message }) => {
  const comment = socialCommentTemplate.cloneNode(true);

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

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentsList.innerHTML = '';
  commentsCount.innerHTML = `${comments} из <span class="comments-count">${comments.length}</span> комментариев`;
  commentsList.append(fragment);
};

export const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoDetails(data);
  renderComments(data.comments);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

function hideBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCancelButtonClick = () => hideBigPicture();

bigPictureCancel.addEventListener('click', onCancelButtonClick);
