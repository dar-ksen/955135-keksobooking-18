'use strict';

(function () {
  var map = window.data.map;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var featureTemplate = cardTemplate.querySelector('.popup__feature');

  var isPopupActive = function (popup) {
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
    for (var i = 0; i < features.length; i++) {
      var feature = featureTemplate.cloneNode(true);
      feature.className = 'popup__feature popup__feature--' + features[i];
      fragment.appendChild(feature);
    }
    featureContainer.appendChild(fragment);
  };

  var getPhoto = function (card, photos) {
    var photoContainer = card.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    cleanContainer(photoContainer);
    for (var i = 0; i < photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = photos[i];
      fragment.appendChild(photo);
    }
    photoContainer.appendChild(fragment);
  };

  var createCard = function (cardElement, card) {
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.TYPE_OF_HOUSE[card.offer.type].text;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    getFeatures(cardElement, card.offer.features);
    getPhoto(cardElement, card.offer.photos);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
  };

  window.card = {
    renderCard: function (container, card) {
      var cardElement = map.querySelector('.popup');

      var closePopup = function () {
        cardElement.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      };

      var onPopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closePopup);
      };

      if (isPopupActive(cardElement)) {
        createCard(cardElement, card);
      } else {
        cardElement = cardTemplate.cloneNode(true);
        createCard(cardElement, card);
        document.addEventListener('keydown', onPopupEscPress);
        var closeButton = cardElement.querySelector('.popup__close');
        closeButton.addEventListener('click', closePopup);
        container.insertBefore(cardElement, map.querySelector('.map__pins').nextSibling);
      }
    },
  };
})();
