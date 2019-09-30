'use strict';

(function () {
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
  var ADVER_TTITLE = ['Свой угол каждому сорванцу!', 'Зеленый свет вашим желаниям!', 'Выбор очевиден!', 'Мирный атом', 'Приветствуем в аду ;)', 'Девичье гнездышко', 'Дыхание природы', 'Дыхание природы'];
  var AVERT_DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.', 'Улучшенная планировка и большая площадь. 44 кв.м. общей площади и 9 метровая кухня это гораздо больше, чем в стандартной 1-комнатной квартире.', 'Удобная геометрия квартиры. Благодаря алькову расположенному в комнате можно выделить спальную зону или установить большой шкаф-купе без ущерба функционалу жилого пространства.', 'Можно дышать свежим воздухом не вдыхая смог проезжающего автотранспорта благодаря тому, что окна квартиры выходят на парк.', 'Квартира в 2-х уровнях, практически свой дом. 100 квадратных метров света и уюта. Живите и радуйтесь жизни в лучах солнца.', 'Милорд, при первой же возможности непримените заглянуть в местную котельную: там вы получите тонну положительного... угля.', 'Но захват мира должен быть довольно-таки весёлым занятием.', 'Реши задачу. Какой окружности у тебя будет синяк, если ты мне не занесёшь долг вечером?'];

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

  window.data = {
    map: map,
    filterForm: filterForm,
    adForm: adForm,
    TYPE_OF_HOUSE: TYPE_OF_HOUSE,
    OFFSET_X: 25,
    OFFSET_Y: 70,
    getArrayOfPins: getArrayOfPins,
  };
})();
