'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // функции
  var getRandomArrayIndex = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomArray = function (array) {
    var lastElement = getRandomNumber(0, array.length);
    return array.slice(0, lastElement);
  };

  // Клавиши
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

  // Активное состояние формы
  var setFormStatus = function (form, isDisabled) {
    var elems = form.elements;
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = isDisabled;
    }
  };

  var isMassiveInclude = function (where, what) {
    var isInclude = true;
    for (var i = 0; i < what.length; i++) {
      if (!(where.includes(what[i]))) {
        isInclude = false;
      }
    }
    return isInclude;
  };

  window.util = {
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    setFormStatus: setFormStatus,
    isMassiveInclude: isMassiveInclude,
  };
})();
