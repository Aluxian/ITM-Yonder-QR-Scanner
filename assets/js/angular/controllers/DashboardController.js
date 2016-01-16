application.controller('DashboardController', [ '$scope', '$timeout', '$http', 'UserFactory', 'GiftFactory', 'TemplateFactory', DashboardController ]);

function DashboardController($scope, $timeout, $http, UserFactory, GiftFactory, TemplateFactory) {
  $scope.user = {};
  $scope.gifts = [];
  $scope.templates = [];
  $scope.newGift = {};
  $scope.showSuccessNotification = false;
  $scope.showFailedNotification = false;

  $scope.createGifts = createGifts;
  $scope.showSuccess = showSuccess;
  $scope.createGift = createGift;
  $scope.createTemplate = createTemplate;
  $scope.emailGift = emailGift;
  $scope.printGift = printGift;
  $scope.emptyNewGift = emptyNewGift;
  $scope.addReceiverToNewGift = addReceiverToNewGift;
  $scope.downloadQRs = downloadQRs;

  $scope.removeTemplate = function(id) {
    TemplateFactory.destroy({ id: id }).then(refresh);
  };

  $scope.removeGift = function(id) {
    GiftFactory.destroy({ id: id }).then(refresh);
  };

  $scope.createdGifts = [];

  $scope.emptyForm = emptyForm;

  refresh();

  function createGifts() {
  }

  function downloadQRs(gift) {
    return $http({ method: 'POST', url: '/gifts', data: gift }).then(function(resp) {
      url = resp.data.url;
      window.open(url, '_blank');
      refresh();
    });
  }

  function addReceiverToNewGift() {
    $scope.newGift.receivers = $scope.newGift.receivers || [];

    $scope.newGift.receivers.push({});
  }

  function showSuccess() {
    $scope.showSuccessNotification = true;

    $timeout(function() {
      $scope.showSuccessNotification = false;
    }, 1000);
  }

  function emptyNewGift() {
    $scope.newGift = {};
  }

  function emailGift(gift) {
    gift.sender = $scope.user.username;

    createGift(gift)
    .then(GiftFactory.emailGift);

    showSuccess();

    emptyNewGift();
  }

  function printGift(gift) {
    emptyNewGift();

    createGift(newGift);
  }

  function createGift(gift) {
    gift.owner = $scope.user.id;

    return GiftFactory.create(gift);
  }

  function createTemplate() {
    return TemplateFactory.create({ name: 'New template', owner: $scope.user.id }).then(refresh);
  }

  function getUser() {
    return UserFactory.getUser().then(saveUser);

    function saveUser(user) {
      $scope.user = user;
    }
  }

  function getGifts() {
    return GiftFactory.getGifts().then(saveGifts);

    function saveGifts(gifts) {
      $scope.gifts = gifts;
    }
  }

  function getTemplates() {
    return TemplateFactory.getTemplates().then(saveTemplates);

    function saveTemplates(templates) {
      $scope.templates = templates;
    }
  }

  function emptyForm() {
    $scope.templ = {
      syntax: 'html',
      source: '<html>\n<p>Hey!</p>\n</html>'
    };
  }

  function refresh() {
    getUser();
    getGifts();
    getTemplates();
    emptyForm();
  }

  $scope.submitNewTemplate = function() {
    TemplateFactory.create({ label: $scope.templ.label, owner: $scope.user.id, syntax: $scope.templ.syntax, source: $scope.templ.source }).then(refresh);
  };
}
