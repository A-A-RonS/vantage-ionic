angular.module('starter.controllers', [])

.controller('FeedCtrl', function($scope,Camera) {
$scope.postList = [];
$scope.getPhoto = function(){
Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
  
  	$scope.savePerson = function(firstname, lastname) {
		var PeopleObject = Parse.Object.extend("PeopleObject");
		var person = new PeopleObject();
		person.set("firstname",firstname);
		person.set("lastname",lastname);
		person.save(null,{});
	};
	
	$scope.getPosts = function(params) {
		
    	var Post = Parse.Object.extend("Post");
    	var query = new Parse.Query(Post);
    	query.find({
        	success: function(results) {
            	alert("Successfully retrieved " + results.length + " people!");
            	$scope.postList = results;
				console.log("results:"+$scope.postList);
        	},
        	error: function(error) {
            	alert("Error: " + error.code + " " + error.message);
        	}
    	});
	};

	$scope.$broadcast('result', $scope.getPosts());

  $scope.$on('newMessage', function(event, messages) {
   console.log("WOW, a new message!!! ");
   $scope.$apply();

});
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ParseCtrl',function($scope){

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
