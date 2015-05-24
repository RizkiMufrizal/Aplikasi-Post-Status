angular.module('App.services')
  .factory('userService', ['$http', function($http) {

    var baseUrl = 'https://aplikasipoststatus.herokuapp.com:443';
    //var baseUrl = 'http://10.0.2.2:3000';
    //var baseUrl = 'http://localhost:3000';
    var user = {};

    return {
      login: function(user) {
        return $http.post(baseUrl + '/api/user/Login', user);
      },
      signUp: function(user) {
        return $http.post(baseUrl + '/api/user/SignUp', user);
      },
      setUser: function(email, nama) {
        user.email = email;
        user.nama = nama;
        return user;
      },
      getUser: function() {
        return user;
      }
    }
  }]);
