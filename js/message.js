'use strict';
(function () {
  var popup;
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var closePopup = function () {
    popup.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var showMessage = function (message) {
    popup = (message) ? errorTemplate.cloneNode(true) : successTemplate.cloneNode(true);

    if (message) {
      popup.querySelector('.error__message').textContent = message;
      var closeError = popup.querySelector('.error__button');
      closeError.addEventListener('click', closePopup);
    }

    document.addEventListener('keydown', onPopupEscPress);
    popup.addEventListener('click', closePopup);
    main.appendChild(popup);
  };

  window.message = {
    show: showMessage,
  };

})();
