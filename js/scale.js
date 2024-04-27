const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleInputEl = document.querySelector('.scale__control--value');
const imageEl = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageEl.style.transform = `scale(${value / 100})`;
  scaleInputEl.value = `${value}%`;
};

const getValue = () => parseInt(scaleInputEl.value, 10);

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
