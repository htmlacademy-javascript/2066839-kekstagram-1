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

let activeEffect = EFFECTS[0];

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const isDefault = () => activeEffect === EFFECTS[0];

const hideSlider = () => sliderContainerElement.classList.add('hidden');

const showSlider = () => sliderContainerElement.classList.remove('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS[0].min,
    max: EFFECTS[0].max,
  },
  start: EFFECTS[0].max,
  step: EFFECTS[0].step,
  connect: 'lower',
});

const onSliderUpdate = () => {
  valueElement.value = sliderElement.noUiSlider.get();

  if (isDefault()) {
    imageElement.style.removeProperty('filter');
  } else {
    imageElement.style.filter = `${activeEffect.style}(${valueElement.value}${activeEffect.unit})`;
  }
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: activeEffect.min,
      max: activeEffect.max,
    },
    start: activeEffect.max,
    step: activeEffect.step,
  });
};

export const resetEffects = () => {
  activeEffect = EFFECTS[0];
  updateSlider();
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  activeEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${activeEffect.name}`;
  updateSlider();

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

sliderElement.noUiSlider.on('update', onSliderUpdate);
effectsElement.addEventListener('change', onEffectChange);
