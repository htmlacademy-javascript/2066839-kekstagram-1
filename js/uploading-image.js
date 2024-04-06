const MAX_COMMENT_LENGTH = 140;
const MAX_TAG_COUNT = 5;
const COMMENTS_ERROR_MESSAGE = 'Не более 140 символов';
const VALID_TAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_MESSAGE = 'Хэштег не валиден';

const form = document.querySelector('.img-upload__form');
const fileField = form.querySelector('.img-upload__input');
const imageEditForm = form.querySelector('.img-upload__overlay');
const imageEditCloseButton = form.querySelector('.img-upload__cancel');
const tagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidCount = (tags) => tags.length <= MAX_TAG_COUNT;

const isValidEveryTag = (value) => {
  const tags = value.every((tag) => VALID_TAGS.test(tag) && !!value.length);
  return tags;
};

const isUniqueTags = (tags) => tags.length === new Set(tags).size;

const isValidTag = (value) => {
  const tags = value.toLowerCase()
    .trim()
    .split(' ')
    .map((item) => item.trim());
  return isValidCount(tags) && isValidEveryTag(tags) && isUniqueTags(tags);
};

pristine.addValidator(
  tagsField,
  isValidTag,
  TAGS_ERROR_MESSAGE
);

const isDescriptionValid = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  commentsField,
  isDescriptionValid,
  COMMENTS_ERROR_MESSAGE
);

const onSubmitForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

form.addEventListener('submit', onSubmitForm);

const hideImageForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileField.value = '';
};

const showImageForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imageEditCloseButton.addEventListener('click', () => hideImageForm());
};

const isTextFieldFocused = () =>
  document.activeElement === tagsField ||
  document.activeElement === commentsField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideImageForm();
  }
}

fileField.addEventListener('change', () => showImageForm());
