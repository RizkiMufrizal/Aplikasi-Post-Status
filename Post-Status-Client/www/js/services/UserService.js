angular.module('App.services')
  .factory('userService', ['$http', function($http) {

    var baseUrl = 'http://10.0.2.2:3000/api/user';
    var user = {};

    return {
      login: function(user) {
        return $http.post(baseUrl + '/Login', user);
      },
      signUp: function(user) {
        return $http.post(baseUrl + '/SignUp', user);
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
