'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var mainPinOffsetX = 32;
  var mainPinOffsetYActive = 70;
  var mainPinOffsetYPassive = 32;
  var map = window.data.map;
  var filterForm = window.data.filterForm;
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinPosition = document.querySelector('#address');
  var adForm = window.data.adForm;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var defautPinPosition = new Coordinate(mainPin.style.left, mainPin.style.top);

  var arrayOfPins;

  var getMainPinPosition = function () {
    var offsetY = map.classList.contains('map--faded') ? mainPinOffsetYPassive : mainPinOffsetYActive;
    var position = new Coordinate(mainPin.offsetLeft + mainPinOffsetX, mainPin.offsetTop + offsetY);
    return position;
  };

  var setMainPinPosition = function () {
    var position = getMainPinPosition();
    mainPinPosition.value = position.x + ', ' + position.y;
  };

  var setActiveState = function () {
    if (map.classList.contains('map--faded')) {
      window.backend.ajax(onLoad, onError, 'GET', URL_LOAD);
    }
  };

  var setPassiveState = function () {
    adForm.reset();
    filterForm.reset();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.util.setFormStatus(filterForm, true);
    window.util.setFormStatus(adForm, true);
    window.data.deletePins();
    window.card.closePopup();
    mainPin.style.left = defautPinPosition.x;
    mainPin.style.top = defautPinPosition.y;
    setMainPinPosition();
    window.form.getHousingPrice();
    window.form.renderCapacity();
    window.uploadPhoto.clearPhotoUpload();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    setActiveState();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      var endCoords = new Coordinate(getMainPinPosition().x - shift.x, getMainPinPosition().y - shift.y);

      if ((endCoords.x >= window.data.LOCATION_X_MIN) && (endCoords.x <= window.data.LOCATION_X_MAX)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((endCoords.y >= window.data.LOCATION_Y_MIN) && (endCoords.y <= window.data.LOCATION_Y_MAX)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.getHousingPrice();
      window.form.renderCapacity();
      setMainPinPosition();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setActiveState);
  });

  filterForm.addEventListener('change', function () {
    window.debounce(window.filter.filterPins)(arrayOfPins);
  });

  // загрузка данных

  var onLoad = function (data) {
    window.util.setFormStatus(filterForm, false);
    window.util.setFormStatus(adForm, false);
    map.classList.remove('map--faded');
    setMainPinPosition();
    adForm.classList.remove('ad-form--disabled');
    arrayOfPins = data;
    window.pin.renderAllPins(arrayOfPins);
  };

  var onError = function (errorMessage) {
    window.message.showMessage(errorMessage);
  };

  var onSend = function () {
    window.message.showMessage();
    setPassiveState();
  };

  // Отправка данных
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.ajax(onSend, onError, 'POST', URL_SAVE, new FormData(adForm));
  });

  var resetButton = adForm.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    setPassiveState();
  });

  setMainPinPosition();
  window.util.setFormStatus(filterForm, true);
  window.util.setFormStatus(adForm, true);
  window.form.getHousingPrice();
  window.form.renderCapacity();

})();
