angular.module('App.controllers', ['App.services'])

  .controller('AppController', function($scope, $ionicModal, $timeout, $ionicPopup, appService, userService) {

    $scope.loginData = {};

    $scope.doLogin = function() {
      userService.login($scope.loginData).success(function(data) {

        if (data.success) {
          var userPopup = $ionicPopup.show({
            template: 'Anda Berhasil Login',
            title: 'Info',
            scope: $scope,
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive',
              onTap: function(e) {
                $scope.modal.hide();
              }
            }]
          });
          userPopup.then(function(res) {
            ChatService.setUsername(res);
            $scope.username = res;
          });
        } else {
          var userPopup = $ionicPopup.show({
            template: data.message,
            title: 'Info',
            scope: $scope,
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive'
            }]
          });
        }

      });
    };

    function checkEmailUser() {
      if (!$scope.loginData.username) {
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }
    }

    checkEmailUser();

  });
