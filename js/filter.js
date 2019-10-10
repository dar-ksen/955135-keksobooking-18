'use strict';

(function () {
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
    return window.util.isMassiveInclude(availableFeatures, requiredFeatures);
  };

  var determinePrice = function (price) {
    var selectedPrice = window.form.getActiveSelectOptionValue(housingPrice);
    var isRequiredPrice;
    switch (selectedPrice) {
      case 'middle':
        isRequiredPrice = (price > 10000) && (price < 50000);
        break;
      case 'low':
        isRequiredPrice = (price < 1000);
        break;
      case 'high':
        isRequiredPrice = (price > 50000);
        break;
      default:
        isRequiredPrice = true;
    }

    return isRequiredPrice;

  };

  var filterPins = function (arrayOfPins) {
    window.data.deletePins();
    window.card.closePopup();
    var sameTypePine = arrayOfPins;
    var type = window.form.getActiveSelectOptionValue(housingType);
    var rooms = window.form.getActiveSelectOptionValue(housingRooms);
    var guests = window.form.getActiveSelectOptionValue(housingGuests);
    sameTypePine = arrayOfPins.filter(function (it) {
      var isRequiredType = (type === 'any') ? true : it.offer.type === type;
      var isRequiredPrice = determinePrice(it.offer.price);
      var isRequiredRooms = (rooms === 'any') ? true : it.offer.rooms === +rooms;
      var isRequiredGuests = (guests === 'any') ? true : it.offer.guests === +guests;
      var isRequiredFeatures = determineFeatures(it.offer.features);
      return isRequiredType && isRequiredPrice && isRequiredRooms && isRequiredGuests && isRequiredFeatures;
    });

    window.pin.renderAllPins(sameTypePine);
  };

  window.filter = {
    filterPins: filterPins,
  };
})();
