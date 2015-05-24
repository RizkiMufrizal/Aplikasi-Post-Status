angular.module('App.services', [])
  .factory('appService', function($http) {

    var baseUrl = 'https://aplikasipoststatus.herokuapp.com:443';
    //var baseUrl = 'http://10.0.2.2:3000';
    //var baseUrl = 'http://localhost:3000';

    return {
      getAllPost: function() {
        return $http.get(baseUrl + '/api/post/AllPost');
      },
      savePost: function(post) {
        return $http.post(baseUrl + '/api/post/SavePost', post);
      },
      commentPost: function(comment) {
        return $http.post(baseUrl + '/api/post/Comment', comment);
      },
      likePost: function(like) {
        return $http.post(baseUrl + '/api/post/Like', like);
      }
    }
  });
