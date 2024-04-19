const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

export const showSuccessMessage = () => {
  const template = messageSuccessTemplate.cloneNode(true);
  const buttonClose = template.querySelector('.success__button');
  const successInner = template.querySelector('.success__inner');
  const successTitle = template.querySelector('.success__title');

  document.addEventListener('click', (evt) => {
    if (evt.target !== successInner && evt.target !== successTitle) {
      template.remove();
    }
  });

  buttonClose.addEventListener('click', () => {
    template.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      template.remove();
    }
  });

  document.body.append(template);
};

export const showErrorMessage = () => {
  const template = messageErrorTemplate.cloneNode(true);
  const buttonClose = template.querySelector('.error__button');
  const errorInner = template.querySelector('.error__inner');
  const errorTitle = template.querySelector('.error__title');

  document.addEventListener('click', (evt) => {
    if (evt.target !== errorInner && evt.target !== errorTitle) {
      template.remove();
    }
  });

  buttonClose.addEventListener('click', () => {
    template.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      template.remove();
    }
  });

  document.body.append(template);
};
