angular.module('App.controllers', ['App.services'])

  .controller('AppController', function($scope, $ionicModal, $timeout, $ionicPopup, appService, userService) {

    $scope.loginData = {};

    $scope.login = function() {
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
                $scope.modalLogin.hide();
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

    $scope.signUp = function() {
      $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalRegister = modal;
        $scope.modalRegister.show();
        $scope.modalLogin.hide();
      });
    };

    $scope.signIn = function() {
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalLogin = modal;
        $scope.modalLogin.show();
        $scope.modalRegister.hide();
      });
    };

    function checkEmailUser() {
      if (!$scope.loginData.username) {
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modalLogin = modal;
          $scope.modalLogin.show();
        });
      }
    }

    checkEmailUser();

  });
