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

};

const onClickButtonSmaller = () => {

};
