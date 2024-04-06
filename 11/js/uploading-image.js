const MAX_COMMENT_SYMBOL_COUNT = 140;
const MAX_HASHTAG_COUNT = 5;
const COMMENTS_ERROR_MESSAGE = 'Не более 140 символов';
const VALID_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_ERROR_MESSAGE = 'Хэштег не валиден';

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const imageEditForm = form.querySelector('.img-upload__overlay');
const imageEditCloseButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const isValidEveryTag = (tags) => {
  const isValidTag = tags.every((tag) => VALID_HASHTAGS.test(tag) && !!tags.length);
  return isValidTag;
};

const isUniqueTags = (tags) => tags.length === new Set(tags).size;

const isValidHashteg = (value) => {
  const tags = value.toLowerCase()
    .trim()
    .split(' ');
  return isValidCount(tags) && isValidEveryTag(tags) && isUniqueTags(tags);
};

pristine.addValidator(
  hashtagsField,
  isValidHashteg,
  HASHTAGS_ERROR_MESSAGE
);

const isValidDescription = (value) => value.length <= MAX_COMMENT_SYMBOL_COUNT;

pristine.addValidator(
  commentsField,
  isValidDescription,
  COMMENTS_ERROR_MESSAGE
);

const onSubmitForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

form.addEventListener('submit', onSubmitForm);

const hideFormImageEdit = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileField.value = '';
};

const showFormImageEdit = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imageEditCloseButton.addEventListener('click', () => hideFormImageEdit());
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === commentsField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideFormImageEdit();
  }
}

fileField.addEventListener('change', () => showFormImageEdit());
