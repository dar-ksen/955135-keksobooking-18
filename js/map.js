'use strict';

(function () {
  var PIN_COUNT = 8;
  var mainPinOffsetX = 32;
  var mainPinOffsetY = 70;
  var arrayOfPins = window.data.getArrayOfPins(PIN_COUNT);
  var mapPins = document.querySelector('.map__pins');

  var map = window.data.map;
  var filterForm = window.data.filterForm;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition = document.querySelector('#address');
  var adForm = window.data.adForm;

  var renderAllPins = function (container, arrayPins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPins.length; i++) {
      fragment.appendChild(window.pin.renderPinAttributs(arrayPins[i]));
    }
    container.appendChild(fragment);
  };

  var getDefautPinPosition = function (pin) {
    var position = {
      'x': pin.offsetLeft + mainPinOffsetX,
      'y': pin.offsetTop + mainPinOffsetY,
    };
    return position;
  };

  var setDefautPinPosition = function (pin) {
    mainPinPosition.value = getDefautPinPosition(pin).x + ', ' + getDefautPinPosition(pin).y;
  };

  var setActiveState = function () {
    if (map.classList.contains('map--faded')) {
      window.util.switchFormElement(filterForm, true);
      window.util.switchFormElement(adForm, true);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      renderAllPins(mapPins, arrayOfPins);
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
  window.util.switchFormElement(filterForm, false);
  window.util.switchFormElement(adForm, false);

})();
