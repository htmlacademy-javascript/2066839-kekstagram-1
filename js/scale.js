const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_DEFAULT = 100;

const biggerButtonElement = document.querySelector('.scale__control--bigger');
const smallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onClickButtonBigger = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue + SCALE_STEP;

  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }

  scaleImage(newValue);
};

const onClickButtonSmaller = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue - SCALE_STEP;

  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }

  scaleImage(newValue);
};

export const resetScaleValue = () => scaleImage(SCALE_DEFAULT);

biggerButtonElement.addEventListener('click', onClickButtonBigger);
smallerButtonElement.addEventListener('click', onClickButtonSmaller);
