'use strict';

(function () {
  var PIN_COUNT = 5;
  var mainPinOffsetX = 32;
  var mainPinOffsetYActive = 70;
  var mainPinOffsetYPassive = 32;
  // var arrayOfPins = window.data.getArrayOfPins(PIN_COUNT);
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var map = window.data.map;
  var filterForm = window.data.filterForm;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition = document.querySelector('#address');
  var adForm = window.data.adForm;

  var renderAllPins = function (container, arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PIN_COUNT; i++) {
      fragment.appendChild(window.pin.renderPinAttributs(arrayPins[i]));
    }
    container.appendChild(fragment);
  };

  var getDefautPinPosition = function (pin) {
    var offsetY = map.classList.contains('map--faded') ? mainPinOffsetYPassive : mainPinOffsetYActive;
    var position = {
      'x': pin.offsetLeft + mainPinOffsetX,
      'y': pin.offsetTop + offsetY,
    };
    return position;
  };

  var setDefautPinPosition = function (pin) {
    mainPinPosition.value = getDefautPinPosition(pin).x + ', ' + getDefautPinPosition(pin).y;
  };

  var setActiveState = function () {
    if (map.classList.contains('map--faded')) {
      window.backend.load(onload, onError);
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    setActiveState();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        x: getDefautPinPosition(mainPin).x - shift.x,
        y: getDefautPinPosition(mainPin).y - shift.y
      };

      if ((endCoords.x >= window.data.LOCATION_X_MIN) && (endCoords.x <= window.data.LOCATION_X_MAX)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((endCoords.y >= window.data.LOCATION_Y_MIN) && (endCoords.y <= window.data.LOCATION_Y_MAX)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      setDefautPinPosition(mainPin);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setActiveState);
  });

  setDefautPinPosition(mainPin);
  window.util.setFormStatus(filterForm, true);
  window.util.setFormStatus(adForm, true);

  // загрузка данных

  var onload = function (pins) {
    window.util.setFormStatus(filterForm, false);
    window.util.setFormStatus(adForm, false);
    map.classList.toggle('map--faded');
    setDefautPinPosition(mainPin);
    adForm.classList.toggle('ad-form--disabled');
    renderAllPins(mapPins, pins);
  };

  var onError = function (errorMessage) {

    var main = document.querySelector('main');

    var closeErrorPopup = function () {
      errorPopap.remove();
      document.removeEventListener('keydown', onErrorPopupEscPress);
    };

    var onErrorPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closeErrorPopup);
    };

    var errorPopap = errorTemplate.cloneNode(true);
    var closeError = errorPopap.querySelector('.error__button');
    errorPopap.querySelector('.error__message').textContent = errorMessage;

    document.addEventListener('keydown', onErrorPopupEscPress);

    errorPopap.addEventListener('click', closeErrorPopup);
    closeError.addEventListener('click', closeErrorPopup);
    main.appendChild(errorPopap);
  };

})();
