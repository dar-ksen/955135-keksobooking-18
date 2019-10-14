'use strict';

(function () {
  var Price = {
    LOW: 10000,
    HIGH: 50000,
  };

  var filterForm = window.data.filterForm;
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');

  var determineFeatures = function (availableFeatures) {
    var features = housingFeatures.querySelectorAll('input:checked');
    var requiredFeatures = [];
    for (var i = 0; i < features.length; i++) {
      requiredFeatures.push(features[i].value);
    }
    return window.util.isArrayInclude(availableFeatures, requiredFeatures);
  };

  var determinePrice = function (price) {
    var selectedPrice = window.form.getActiveSelectOptionValue(housingPrice);
    var isRequiredPrice;
    switch (selectedPrice) {
      case 'middle':
        isRequiredPrice = (price >= Price.LOW) && (price < Price.HIGH);
        break;
      case 'low':
        isRequiredPrice = (price < Price.LOW);
        break;
      case 'high':
        isRequiredPrice = (price >= Price.HIGH);
        break;
      default:
        isRequiredPrice = true;
    }

    return isRequiredPrice;
  };

  var filterPins = window.debounce(function (arrayOfPins) {
    window.data.deletePins();
    window.card.closePopup();
    var sameTypePine = arrayOfPins;
    var type = window.form.getActiveSelectOptionValue(housingType);
    var rooms = window.form.getActiveSelectOptionValue(housingRooms);
    var guests = window.form.getActiveSelectOptionValue(housingGuests);
    sameTypePine = arrayOfPins.filter(function (it) {
      var isRequiredType = (type === 'any') ? true : it.offer.type === type;
      var isRequiredPrice = determinePrice(it.offer.price);
      var isRequiredRooms = (rooms === 'any') ? true : it.offer.rooms === parseInt(rooms, 10);
      var isRequiredGuests = (guests === 'any') ? true : it.offer.guests === parseInt(guests, 10);
      var isRequiredFeatures = determineFeatures(it.offer.features);
      return isRequiredType && isRequiredPrice && isRequiredRooms && isRequiredGuests && isRequiredFeatures;
    });

    window.pin.renderAllPins(sameTypePine);
  });

  window.filter = {
    filterPins: filterPins,
  };
})();
