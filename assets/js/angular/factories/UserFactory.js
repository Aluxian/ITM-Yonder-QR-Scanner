application.factory('UserFactory', [ '$http', UserFactory ]);

function UserFactory($http) {
  return {
    getUser: getUser
  };

  function sendData(response) {
    return response.data;
  }

  function sendError(response) {
    return response.data;
  }

  function getUser() {
    return $http({ method: 'GET', url: '/loggedInUser' }).then(sendData, sendError);
  }
}
