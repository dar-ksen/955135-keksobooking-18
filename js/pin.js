'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    renderPinAttributs: function (pin) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = (pin.location.x - window.data.OFFSET_X) + 'px';
      pinElement.style.top = (pin.location.y - window.data.OFFSET_Y) + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.author.avatar;
      return pinElement;
    }
  };

})();
