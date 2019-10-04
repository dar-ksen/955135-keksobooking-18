'use strict';

(function () {
  var map = window.data.map;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPinAttributs = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = (pin.location.x - window.data.OFFSET_X) + 'px';
    pinElement.style.top = (pin.location.y - window.data.OFFSET_Y) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.description;
    pinElement.addEventListener('click', function () {
      window.card.renderCard(map, pin);
    });
    return pinElement;
  };

  window.pin = {
    renderPinAttributs: renderPinAttributs,
  };

})();
