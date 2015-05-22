angular.module('App.controllers', ['App.services'])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, appService, userService) {

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

  })

  .controller('PlaylistsCtrl', function($scope, $ionicModal, $timeout, appService, userService) {

    $scope.playlists = [
      {
        title: 'Reggae',
        id: 1
      },
      {
        title: 'Chill',
        id: 2
      },
      {
        title: 'Dubstep',
        id: 3
      },
      {
        title: 'Indie',
        id: 4
      },
      {
        title: 'Rap',
        id: 5
      },
      {
        title: 'Cowbell',
        id: 6
      }
    ];
  })

  .controller('PlaylistCtrl', function($scope, $stateParams) {});
