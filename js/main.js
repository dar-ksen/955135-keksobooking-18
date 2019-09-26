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
var TYPE_OF_HOUSE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};
var ADVER_TTITLE = ['Свой угол каждому сорванцу!', 'Зеленый свет вашим желаниям!', 'Выбор очевиден!', 'Мирный атом', 'Приветствуем в аду ;)', 'Девичье гнездышко', 'Дыхание природы', 'Дыхание природы'];
var AVERT_DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Улучшенная планировка и большая площадь. 44 кв.м. общей площади и 9 метровая кухня это гораздо больше, чем в стандартной 1-комнатной квартире.', 'Удобная геометрия квартиры. Благодаря алькову расположенному в комнате можно выделить спальную зону или установить большой шкаф-купе без ущерба функционалу жилого пространства.', 'Можно дышать свежим воздухом не вдыхая смог проезжающего автотранспорта благодаря тому, что окна квартиры выходят на парк.', 'Квартира в 2-х уровнях, практически свой дом. 100 квадратных метров света и уюта. Живите и радуйтесь жизни в лучах солнца.', 'Милорд, при первой же возможности непримените заглянуть в местную котельную: там вы получите тонну положительного... угля.', 'Но захват мира должен быть довольно-таки весёлым занятием.', 'Реши задачу. Какой окружности у тебя будет синяк, если ты мне не занесёшь долг вечером?'];

// Клавиши
var ENTER_KEYCODE = 13;

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


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
        'title': getRandomArrayIndex(ADVER_TTITLE),
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': getRandomArrayIndex(TYPE),
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomArrayIndex(CHECK),
        'checkout': getRandomArrayIndex(CHECK),
        'features': getRandomArray(FEATURES),
        'description': getRandomArrayIndex(AVERT_DESCRIPTION),
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

var renderCard = function (card) {

  var getFeatures = function (features) {
    var featureContainer = cardElement.querySelector('.popup__features');
    var featureСollection = cardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < FEATURES.length; i++) {
      if (!features.includes(FEATURES[i])) {
        featureContainer.removeChild(featureСollection[i]);
      }
    }
  };

  var getPhoto = function (photos) {
    var photoContainer = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');
    photoContainer.removeChild(photoTemplate);
    for (var i = 0; i < photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = photos[i];
      photoContainer.appendChild(photo);
    }
  };

  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSE[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  getFeatures(card.offer.features);
  getPhoto(card.offer.photos);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  mapPins.appendChild(cardElement);
};

var renderAllPins = function (arrayPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPins.length; i++) {
    fragment.appendChild(renderPinAttributs(arrayPins[i]));
  }
  mapPins.appendChild(fragment);
};


var map = document.querySelector('.map');
var filterForm = map.querySelector('.map__filters');
var mainPin = map.querySelector('.map__pin--main');
var mainPinPosition = document.querySelector('#address');
var adForm = document.querySelector('.ad-form');

var switchFormElement = function (form, toggle) {
  var elems = form.elements;
  for (var i = 0; i < elems.length; i++) {
    elems[i].disabled = toggle;
  }
};

var getDefautPinPosition = function () {
  var position = {
    'x': mainPin.offsetLeft + OFFSET_X,
    'y': mainPin.offsetTop + OFFSET_Y,
  };
  return (position.x + ', ' + position.y);
};

var getActiveState = function () {
  if (map.classList.contains('map--faded')) {
    switchFormElement(filterForm, false);
    switchFormElement(adForm, false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mainPinPosition.value = getDefautPinPosition();
    renderAllPins(arrayOfPins);
    renderCard(arrayOfPins[0]);
    renderCapacity();
  }
};

mainPin.addEventListener('mousedown', function () {
  getActiveState();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getActiveState();
  }
});

var arrayOfPins = getArrayOfPins(PIN_COUNT);
switchFormElement(filterForm, true);
switchFormElement(adForm, true);

// ограничения накладываемые на поле.

var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var price = adForm.querySelector('#price');
var type = adForm.querySelector('#type');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var numberPlace = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

var placeMap = {
  '0': 'не для гостей',
  '1': 'для 1 гостя',
  '2': 'для 2 гостей',
  '3': 'для 3 гостей',
};

var renderCapacity = function () {
  var optionTemplate = capacity.querySelector('option');
  optionTemplate.selected = false;
  while (capacity.firstChild) {
    capacity.removeChild(capacity.firstChild);
  }
  var place = numberPlace[roomNumber.options[roomNumber.selectedIndex].value];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < place.length; i++) {
    var option = optionTemplate.cloneNode(true);
    option.value = place[i];
    option.text = placeMap[place[i]];
    fragment.appendChild(option);
  }
  capacity.appendChild(fragment);
};

var typeHousingPrice = {
  'bungalo': {
    'min': 0,
    'max': 1000000,
  },
  'flat': {
    'min': 1000,
    'max': 1000000,
  },
  'house': {
    'min': 5000,
    'max': 1000000,
  },
  'palace': {
    'min': 10000,
    'max': 1000000,
  },
};

var getActiveSelectOptionValue = function (selectElement) {
  return selectElement.options[selectElement.selectedIndex].value;
};

type.addEventListener('change', function () {
  var key = getActiveSelectOptionValue(type);
  price.min = typeHousingPrice[key].min;
  price.placeholder = typeHousingPrice[key].min;
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
