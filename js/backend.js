'use strict';

(function () {
  var TIMEOUT = 10000;
  var REQUIRED_TYPE = 'json';
  var Request = {
    STATUS_SUCCESS: 200,
    STATE_DONE: 4
  };

  var ajax = function (onLoad, onError, method, url, data) {
    if (!data) {
      data = null;
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = REQUIRED_TYPE;
    xhr.addEventListener('load', function () {
      if (xhr.status === Request.STATUS_SUCCESS && (!data ? xhr.readyState === Request.STATE_DONE : true)) {
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

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);

  };

  window.backend = {
    ajax: ajax,
  };
})();
