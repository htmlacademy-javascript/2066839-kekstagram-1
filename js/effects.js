const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    step: 0.1,
    min: 1,
    max: 3,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const hideSlider = () => sliderContainerElement.classList.add('hidden');

const showSlider = () => sliderContainerElement.classList.remove('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

const onSliderUpdate = () => {
  valueElement.value = sliderElement.noUiSlider.get();

  if (isDefault()) {
    imageElement.style.filter = DEFAULT_EFFECT.style;
  } else {
    imageElement.style.filter = `${chosenEffect.style}(${valueElement.value}${chosenEffect.unit})`;
  }
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

export const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

sliderElement.noUiSlider.on('update', onSliderUpdate);
effectsElement.addEventListener('change', onEffectChange);
