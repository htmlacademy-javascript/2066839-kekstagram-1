const errorDialogTemplate = document.querySelector('#error-dialog')
  .content
  .querySelector('.error-dialog');

let activeDialog;

export const showDialog = (template) => {
  activeDialog = template.cloneNode(true);

  const buttonClose = activeDialog.querySelector('button');

  buttonClose.addEventListener('click', () => {
    hideDialog();
  });

  activeDialog.addEventListener('click', (evt) => {
    if (evt.target === activeDialog) {
      hideDialog();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown, true);
  document.body.append(activeDialog);
};

function hideDialog() {
  activeDialog.remove();
  activeDialog = null;
  document.removeEventListener('keydown', onDocumentKeydown, true);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideDialog();
  }
}

export const showAlert = () => {
  const template = errorDialogTemplate.cloneNode(true);
  document.body.append(template);

  setTimeout(() => {
    template.remove();
  }, 3000);
};
