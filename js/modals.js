const successDialogTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorDialogTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

let activeDialog;

export const showDialog = (template) => {
  if (template === 'error') {
    activeDialog = errorDialogTemplate.cloneNode(true);
  } else if (template === 'success') {
    activeDialog = successDialogTemplate.cloneNode(true);
  }

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
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideDialog();
  }
}
