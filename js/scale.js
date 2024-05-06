const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const getValue = () => parseInt(scaleInputElement.value, 10);

const onClickButtonBigger = () => {
  const newValue = Math.min(getValue() + SCALE_STEP, MAX_SCALE);

  scaleImage(newValue);
};

const onClickButtonSmaller = () => {
  const newValue = Math.max(getValue() - SCALE_STEP, MIN_SCALE);

  scaleImage(newValue);
};

scaleUpButton.addEventListener('click', onClickButtonBigger);
scaleDownButton.addEventListener('click', onClickButtonSmaller);
