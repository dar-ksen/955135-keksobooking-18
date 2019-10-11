'use strict';

(function () {
  var map = window.data.map;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var featureTemplate = cardTemplate.querySelector('.popup__feature');

  var popup;

  var closePopup = function () {
    window.data.clearPins();
    if (isPopupActive()) {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var isPopupActive = function () {
    return map.contains(popup);
  };

  var cleanContainer = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  var getFeatures = function (card, features) {
    var featureContainer = card.querySelector('.popup__features');
    var fragment = document.createDocumentFragment();
    cleanContainer(featureContainer);
    features.forEach(function (item) {
      var feature = featureTemplate.cloneNode(true);
      feature.className = 'popup__feature popup__feature--' + item;
      fragment.appendChild(feature);
    });
    featureContainer.appendChild(fragment);
  };

  var getPhoto = function (card, photos) {
    var photoContainer = card.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    cleanContainer(photoContainer);
    photos.forEach(function (item) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = item;
      fragment.appendChild(photo);
    });
    photoContainer.appendChild(fragment);
  };

  var createCard = function (card) {
    popup = cardTemplate.cloneNode(true);
    popup.querySelector('.popup__avatar').src = card.author.avatar;
    popup.querySelector('.popup__title').textContent = card.offer.title;
    popup.querySelector('.popup__text--address').textContent = card.offer.address;
    popup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = window.data.TYPE_OF_HOUSE[card.offer.type].text;
    popup.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    getFeatures(popup, card.offer.features);
    getPhoto(popup, card.offer.photos);
    popup.querySelector('.popup__description').textContent = card.offer.description;
    document.addEventListener('keydown', onPopupEscPress);
    var closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', closePopup);
    map.insertBefore(popup, map.querySelector('.map__pins').nextSibling);
  };

  window.card = {
    renderCard: function (card, pinElement) {
      popup = map.querySelector('.popup');
      closePopup();
      createCard(card);
      pinElement.classList.add('map__pin--active');
    },
    closePopup: closePopup,
  };
})();
