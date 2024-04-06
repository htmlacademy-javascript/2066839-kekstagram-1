const MAX_COMMENT_LENGTH = 140;
const MAX_TAG_COUNT = 5;
const COMMENTS_ERROR_MESSAGE = 'Не более 140 символов';
const VALID_TAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_MESSAGE = 'Хэштеги не валиден';

const imageUploadForm = document.querySelector('.img-upload__form');
const fileField = imageUploadForm.querySelector('.img-upload__input');
const imageEditForm = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const tagsField = imageUploadForm.querySelector('.text__hashtags');
const commentsField = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTagsCountValid = (tags) => tags.length <= MAX_TAG_COUNT;

const isTagsValid = (value) => {
  const tags = value.every((tag) => VALID_TAGS.test(tag) && !!value.length);
  return tags;
};

const isTagsUnique = (tags) => tags.length === new Set(tags).size;

const isTagValid = (value) => {
  const tags = value.toLowerCase()
    .trim()
    .split(' ')
    .map((item) => item.trim());
  return isTagsCountValid(tags) && isTagsValid(tags) && isTagsUnique(tags);
};

pristine.addValidator(
  tagsField,
  isTagValid,
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

imageUploadForm.addEventListener('submit', onSubmitForm);

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
