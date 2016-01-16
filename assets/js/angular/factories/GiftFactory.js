application.factory('GiftFactory', [ '$http', GiftFactory ]);

function GiftFactory($http) {
  return {
    getGifts: getGifts,
    find: find,
    create: create,
    update: update,
    destroy: destroy,
    emailGift: emailGift
  };

  function emailGift(gift) {
    return $http({ method: 'POST', url: '/sendEmailWithGift', data: gift });
  }

  function sendData(response) {
    return response.data;
  }

  function sendError(response) {
    return { error: response.data };
  }

  function getGifts() {
    return $http({ method: 'GET', url: '/gifts' }).then(sendData, sendError);
  }

  function find(params) {
    return $http({ method: 'GET', url: '/gift', params: params }).then(sendData, sendError);
  }

  function create(gift) {
    return $http({ method: 'POST', url: '/gift', data: gift }).then(sendData, sendError);
  }

  function update(gift) {
    return $http({ method: 'PUT', url: '/gift/' + gift.id, data: gift }).then(sendData, sendError);
  }

  function destroy(gift) {
    return $http({ method: 'DELETE', url: '/gift/' + gift.id }).then(sendData, sendError);
  }
}
