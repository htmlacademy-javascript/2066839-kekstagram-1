const RERENDER_DELAY = 500;

export const debounce = (cb, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};
