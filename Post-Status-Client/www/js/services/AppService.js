angular.module('App.services', [])
  .factory('appService', function($http) {

    var baseUrl = 'http://10.0.2.2:3000/api/post';
    //var baseUrl = 'http://localhost:3000/api/post';

    return {
      getAllPost: function() {
        return $http.get(baseUrl + '/AllPost');
      },
      savePost: function(post) {
        return $http.post(baseUrl + '/SavePost', post);
      },
      commentPost: function(comment) {
        return $http.post(baseUrl + '/Comment', comment);
      },
      likePost: function(like) {
        return $http.post(baseUrl + '/Like', like);
      }
    }
  });
