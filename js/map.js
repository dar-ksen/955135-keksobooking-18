'use strict';

(function () {
  var PIN_COUNT = 8;
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
      'x': pin.offsetLeft + window.data.OFFSET_X,
      'y': pin.offsetTop + window.data.OFFSET_Y,
    };
    return (position.x + ', ' + position.y);
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

  mainPin.addEventListener('mousedown', function () {
    setActiveState();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setActiveState);
  });

  mainPinPosition.value = getDefautPinPosition(mainPin);

  window.util.switchFormElement(filterForm, false);
  window.util.switchFormElement(adForm, false);

})();
