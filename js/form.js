'use strict';

(function () {
  var NUMBER_OF_ROOMS_EXSEPTION = '100';
  var adForm = window.util.adForm;
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
      if ((room >= options[i].value) && (options[i].value !== '0')) {
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

  type.addEventListener('change', function () {
    var key = getActiveSelectOptionValue(type);
    price.min = window.data.typeOfHouse[key].minPrice;
    price.placeholder = window.data.typeOfHouse[key].minPrice;
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

  renderCapacity();
})();
