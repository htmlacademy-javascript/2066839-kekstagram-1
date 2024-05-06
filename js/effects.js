const EFFECTS = {
  none: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    style: 'grayscale',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  sepia: {
    style: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: '',
  },
  marvin: {
    style: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%',
  },
  phobos: {
    style: 'blur',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    step: 0.1,
    min: 1,
    max: 3,
    unit: '',
  }
};

let activeEffect = EFFECTS.none;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const isDefault = () => activeEffect === EFFECTS.none;

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS.none.min,
    max: EFFECTS.none.max,
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
  connect: 'lower',
});

export const resetEffects = () => {
  activeEffect = EFFECTS.none;
  imageElement.removeAttribute('style');
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  imageElement.style.filter = `${activeEffect.style}(${valueElement.value}${activeEffect.unit})`;
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

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  activeEffect = EFFECTS[evt.target.value] ?? EFFECTS.none;

  if (isDefault()) {
    resetEffects();
  } else {
    updateSlider();
    sliderContainerElement.classList.remove('hidden');
  }
};

sliderElement.noUiSlider.on('update', onSliderUpdate);
effectsElement.addEventListener('change', onEffectChange);
