'use strict';

(function () {
  var NUMBER_OF_ROOMS_EXSEPTION = '100';
  var adForm = window.data.adForm;
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var getActiveSelectOptionValue = function (selectElement) {
    return selectElement.options[selectElement.selectedIndex].value;
  };

  var renderCapacity = function () {
    var options = capacity.querySelectorAll('option');
    var room = getActiveSelectOptionValue(roomNumber);
    for (var i = 0; i < options.length; i++) {
      if ((room >= options[i].value) && (options[i].value !== '0') && (room !== NUMBER_OF_ROOMS_EXSEPTION)) {
        options[i].disabled = false;
      } else if ((room === NUMBER_OF_ROOMS_EXSEPTION) && (options[i].value === '0')) {
        options[i].disabled = false;
        options[i].selected = true;
      } else {
        options[i].disabled = true;
        if (options[i].selected) {
          options[i].selected = false;
        }
      }
    }
  };

  var getHousingPrice = function () {
    var key = getActiveSelectOptionValue(type);
    price.min = window.data.TYPE_OF_HOUSE[key].minPrice;
    price.placeholder = window.data.TYPE_OF_HOUSE[key].minPrice;
  };

  type.addEventListener('change', function () {
    getHousingPrice();
  });

  roomNumber.addEventListener('change', function () {
    renderCapacity();
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.form = {
    getHousingPrice: getHousingPrice,
    renderCapacity: renderCapacity,
    getActiveSelectOptionValue: getActiveSelectOptionValue,
  };
})();
