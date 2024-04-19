import { showErrorMessage, showSuccessMessage } from './message.js';
import { showAlert } from './util.js';
import { sendData } from './api.js';
import { resetScaleValue } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_TAG_COUNT = 5;
const COMMENTS_ERROR_MESSAGE = 'Не более 140 символов';
const VALID_TAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAGS_ERROR_MESSAGE = 'Хэштеги не валидны';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const imageUploadForm = document.querySelector('.img-upload__form');
const fileField = imageUploadForm.querySelector('.img-upload__input');
const formOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const tagsField = imageUploadForm.querySelector('.text__hashtags');
const commentsField = imageUploadForm.querySelector('.text__description');
const submitFormButton = imageUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTagsCountValid = (tags) => tags.length <= MAX_TAG_COUNT;

const isTagsValid = (tags) => tags.every((tag) => VALID_TAGS.test(tag) && !!tags.length);

const isTagsUnique = (tags) => tags.length === new Set(tags).size;

const isTagsFieldValid = (value) => {
  const tags = value.toLowerCase()
    .trim()
    .split(' ')
    .map((item) => item.trim());

  return isTagsCountValid(tags) && isTagsValid(tags) && isTagsUnique(tags);
};

pristine.addValidator(
  tagsField,
  isTagsFieldValid,
  TAGS_ERROR_MESSAGE
);

const isDescriptionValid = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  commentsField,
  isDescriptionValid,
  COMMENTS_ERROR_MESSAGE
);

const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = SubmitButtonText.IDLE;
};

export const setOnFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => showAlert('Данные успешно отправлены', 'green'))
        .then(onSuccess)
        .catch((err) => {
          showAlert(err);
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export const hideImageForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  fileField.value = '';
  tagsField.value = '';
  commentsField.value = '';
  pristine.reset();
  resetScaleValue();
  resetEffects();
  showSuccessMessage();
};

const showImageForm = () => {
  formOverlay.classList.remove('hidden');
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
