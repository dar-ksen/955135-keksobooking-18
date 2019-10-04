'use strict';

(function () {
  var TYPE = 'json';
  var METHOD = 'GET';
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000;
  var Request = {
    STATUS: 200,
    STATE: 4
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE;
    xhr.addEventListener('load', function () {
      if (xhr.readyState === Request.STATE && xhr.status === Request.STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.TIMEOUT = TIMEOUT;
    xhr.open(METHOD, URL_GET);

    xhr.send();
  };

  window.backend = {
    load: load,
  };
})();
