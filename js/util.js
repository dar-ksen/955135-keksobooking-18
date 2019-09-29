'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var filterForm = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');

  var TYPE_OF_HOUSE = {
    'palace': {
      'text': 'Дворец',
      'minPrice': 10000,
    },
    'house': {
      'text': 'Дом',
      'minPrice': 5000,
    },
    'flat': {
      'text': 'Квартира',
      'minPrice': 1000,
    },
    'bungalo': {
      'text': 'Бунгало',
      'minPrice': 0,
    },
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var switchFormElement = function (form, isActive) {
    var elems = form.elements;
    var toggle = true;
    if (isActive) {
      toggle = false;
    }
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = toggle;
    }
  };

  window.util = {
    map: map,
    filterForm: filterForm,
    adForm: adForm,
    TYPE_OF_HOUSE: TYPE_OF_HOUSE,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    switchFormElement: switchFormElement,
  };
})();
