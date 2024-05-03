import { debounce } from './utils.js';
import { renderGallery, getPictures } from './gallery.js';

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imagesFiltersContainer = document.querySelector('.img-filters');

const getRandomNumber = () => Math.random() - 0.5;

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const sortPictureByType = (type) => {
  const pictures = getPictures();

  switch (type) {
    case Filter.RANDOM:
      return pictures.toSorted(getRandomNumber).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return pictures.toSorted(sortByComments);
    default:
      return pictures;
  }
};

const onFilterChange = debounce((evt) => {
  const target = evt.target;

  if (!evt.target.matches('button.img-filters__button:not(.img-filters__button--active)')) {
    return;
  }

  imagesFiltersContainer.querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');

  const sortedPictures = sortPictureByType(target.id);
  renderGallery(sortedPictures);
});

export const initFilters = () => {
  imagesFiltersContainer.classList.remove('img-filters--inactive');
  imagesFiltersContainer.addEventListener('click', onFilterChange);
};
