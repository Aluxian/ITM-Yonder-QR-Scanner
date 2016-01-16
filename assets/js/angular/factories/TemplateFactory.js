application.factory('TemplateFactory', [ '$http', TemplateFactory ]);

function TemplateFactory($http) {
  return {
    getTemplates: getTemplates,
    find: find,
    create: create,
    update: update,
    destroy: destroy
  };

  function sendData(response) {
    return response.data;
  }

  function sendError(response) {
    return { error: response.data };
  }

  function getTemplates() {
    return $http({ method: 'GET', url: '/templates' }).then(sendData, sendError);
  }

  function find(params) {
    return $http({ method: 'GET', url: '/template', params: params }).then(sendData, sendError);
  }

  function create(template) {
    return $http({ method: 'POST', url: '/template', data: template }).then(sendData, sendError);
  }

  function update(template) {
    return $http({ method: 'PUT', url: '/template/' + template.id, data: template }).then(sendData, sendError);
  }

  function destroy(template) {
    return $http({ method: 'DELETE', url: '/template/' + template.id }).then(sendData, sendError);
  }
}
