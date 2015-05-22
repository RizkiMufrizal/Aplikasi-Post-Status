angular.module('App.controllers', ['App.services'])

  .controller('AppController', function($scope, $ionicModal, $timeout, $ionicPopup, appService, userService) {

    $scope.loginData = {};
    $scope.registerData = {};
    $scope.inputPost = {};
    $scope.dataPost = {};
    $scope.enable = false;

    $scope.createPost = function(post) {
      var dataPost = {};
      dataPost.keterangan = post.keterangan;
      dataPost.nama = userService.getUser().nama;
      dataPost.email = userService.getUser().email;

      appService.savePost(dataPost).success(function(data) {
        $scope.inputPost.keterangan = '';
        getAllPost();
      });
    };

    $scope.likePost = function(l) {
      var like = {};
      like.id = l;
      like.emailLike = userService.getUser().email;

      appService.likePost(like).success(function(data) {
        getAllPost();
      });
    };

    $scope.showComment = function() {
      $scope.enable = true;
    };

    $scope.commentPost = function(c) {
      var comment = {};
    };

    $scope.login = function() {
      userService.login($scope.loginData).success(function(data) {

        if (data.success) {
          getAllPost();
          var userPopup = $ionicPopup.show({
            template: 'Anda Berhasil Login',
            title: 'Info',
            scope: $scope,
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive',
              onTap: function(e) {
                userService.setUser(data.email, data.nama);
                $scope.modalLogin.hide();
                $scope.loginData.username = '';
                $scope.loginData.password = '';
              }
            }]
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

    $scope.register = function() {
      userService.signUp($scope.registerData).success(function(data) {

        if (data.name === 'MongoError') {
          var userPopup = $ionicPopup.show({
            template: 'Email telah digunakan oleh akun lain',
            title: 'Info',
            scope: $scope,
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive'
            }]
          });
        } else {
          $scope.registerData.email = '';
          $scope.registerData.nama = '';
          $scope.registerData.password = '';

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

    $scope.signIn = function() {
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalLogin = modal;
        $scope.modalLogin.show();
        $scope.modalRegister.hide();
      });
    };

    function getAllPost() {
      appService.getAllPost().success(function(data) {
        $scope.dataPost = data;
      });
    }

    function checkEmailUser() {
      if (!$scope.loginData.username) {
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modalLogin = modal;
          $scope.modalLogin.show();
        });
      } else {
        getAllPost();
      }
    }

    checkEmailUser();

  });
