angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $window, $log) {
  // Main app controller, empty for the example

  forge.logging.log('AppCtrl loaded');

  $rootScope.stackCursorPosition = 0;

})

// A simple controller that fetches a list of data
.controller('PetsTabCtrl', function($scope, Pets, $window, $log) {
  forge.logging.log('PetsTabCtrl loaded');

  $scope.pets = Pets.all();

  $scope.$on('tab.shown', function() {
    // Might do a load here
  });
  $scope.$on('tab.hidden', function() {
    // Might recycle content here
  });
})

// A simple controller that shows a tapped item's data
.controller('PetCtrl', function($scope, $rootScope, $routeParams, Pets) {

  forge.logging.log('PetCtrl loaded');

  $rootScope.stackCursorPosition++;

  $scope.pet = Pets.get($routeParams.petId);
});
