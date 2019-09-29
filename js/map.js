'use strict';

(function () {
  var PIN_COUNT = 8;
  var arrayOfPins = window.data.getArrayOfPins(PIN_COUNT);
  var mapPins = document.querySelector('.map__pins');

  var map = window.util.map;
  var filterForm = window.util.filterForm;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition = document.querySelector('#address');
  var adForm = window.util.adForm;

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

  // 9. Личный проект: доверяй, но проверяй
  var isPopupActive = function (popup) {
    return map.contains(popup);
  };

  mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== mapPins) {
      if (target.classList.contains('map__pin')) {
        evt.preventDefault();
        for (var i = 0; i < arrayOfPins.length; i++) {
          if (arrayOfPins[i].author.avatar === target.querySelector('img').alt) {
            console.log (isPopupActive(document.querySelector('.popup')));
            window.card.renderCard(map, arrayOfPins[i]);
          }
        }
        return;
      }
      target = target.parentNode;
    }

  });

})();
