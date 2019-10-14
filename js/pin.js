'use strict';

(function () {
  var PIN_COUNT = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var renderPinAttributs = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - window.data.OFFSET_X) + 'px';
    pinElement.style.top = (pin.location.y - window.data.OFFSET_Y) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.description;
    pinElement.addEventListener('click', function () {
      window.card.render(pin, pinElement);
    });
    return pinElement;
  };

  var renderAllPins = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    var takeNumber = arrayPins.length > PIN_COUNT ? PIN_COUNT : arrayPins.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPinAttributs(arrayPins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderAll: renderAllPins,
  };

})();
