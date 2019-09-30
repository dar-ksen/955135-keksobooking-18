'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    switchFormElement: switchFormElement,
  };
})();
