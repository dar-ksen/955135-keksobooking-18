'use strict';

var PIN_COUNT = 8;
var OFFSET_X = 25;
var OFFSET_Y = 70;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_MIN = 1;
var PRICE_MAX = 5000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 0;
var GUESTS_MAX = 10;
var LOCATION_X_MIN = 1;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


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

var getArrayOfPins = function (count) {
  var pins = [];
  for (var i = 0; i < count; i++) {
    var pin = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Самый лучший заголовок',
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': getRandomArrayIndex(TYPE),
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomArrayIndex(CHECK),
        'checkout': getRandomArrayIndex(CHECK),
        'features': getRandomArray(FEATURES),
        'description': 'Описание',
        'photos': getRandomArray(PHOTOS)
      },
      'location': {
        'x': getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
        'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX),
      }
    };
    pin.offer.address = pin.location.x + ', ' + pin.location.y;
    pins.push(pin);
  }
  return pins;
};

var renderPinAttributs = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (pin.location.x - OFFSET_X) + 'px';
  pinElement.style.top = (pin.location.y - OFFSET_Y) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = 'Метка объявления';
  return pinElement;
};

var renderAllPins = function (arrayPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPins.length; i++) {
    fragment.appendChild(renderPinAttributs(arrayPins[i]));
  }
  mapPins.appendChild(fragment);
};

var pins = getArrayOfPins(PIN_COUNT);

renderAllPins(pins);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
