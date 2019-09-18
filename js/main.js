'use strict';

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinCount = 8;
var OFFSET_X = 25;
var OFFSET_Y = 70;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var returnRandomArray = function (array) {
  var returnArray = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.3) {
      returnArray.push(array[i]);
    }
  }
  return returnArray;
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
        'price': getRandomNumber(5, 10) * 100,
        'type': getRandomArrayIndex(TYPE),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': getRandomArrayIndex(CHECK),
        'checkout': getRandomArrayIndex(CHECK),
        'features': returnRandomArray(FEATURES),
        'description': 'Описание',
        'photos': returnRandomArray(PHOTOS)
      },
      'location': {
        'x': getRandomNumber(1, 1200),
        'y': getRandomNumber(130, 630),
      }
    };
    pin.offer.address = pin.location.x + ', ' + pin.location.y;
    pins.push(pin);
  }
  return pins;
};

var setPinAttributs = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = (pin.location.x - OFFSET_X) + 'px';
  pinElement.style.top = (pin.location.y - OFFSET_Y) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = 'Метка объявления';
  return pinElement;
};

var renderAllPins = function (count) {
  var fragment = document.createDocumentFragment();
  var pins = getArrayOfPins(count);
  for (var i = 0; i < count; i++) {
    fragment.appendChild(setPinAttributs(pins[i]));
  }
  mapPins.appendChild(fragment);
};

renderAllPins(pinCount);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
