'use strict';

angular.$debug = true;

var userAgent = navigator.userAgent.toLowerCase();
if (false && /(ipad|iphone)/.test(userAgent)) {
  document.addEventListener('deviceready', function() {
    angular.bootstrap(document, ['$app']);
  }, false);
} else {
  setTimeout(function() {
    angular.bootstrap(document, ['$app']);
  });
}

angular.module('$app', ['ajoslin.mobile-navigate', 'ngRoute', 'ngTouch'])

  .service('console', function($window) {
    return angular.$debug ? $window.console : {log: function() {}, warn: function() {}, error: function() {}};
  })

  .constant('workouts', [
    {id:'jumping-jacks', name: 'Jumping Jacks'},
    {id:'wall-sit', name: 'Wall Sit'},
    {id:'push-up', name: 'Push Up'},
    {id:'abdominal-crunch', name: 'Abdominal Crunch'},
    {id:'step-up-onto-chair', name: 'Step-Up onto Chair'},
    {id:'squat', name: 'Squat'},
    {id:'triceps-dip-on-chair', name: 'Triceps Dip on Chair'},
    {id:'plank', name: 'Plank'},
    {id:'high-knees-running-in-place', name: 'High Knees Running in Place'},
    {id:'lunge', name: 'Lunge'},
    {id:'push-up-and-rotation', name: 'Push-up and Rotation'},
    {id:'side-plank', name: 'Side Plank'}
  ])

  .value('workout', {
    duration: 420,
    rest: {
      name: 'Rest',
      time: 0.25
    },
    list: ['jumping-jacks', 'wall-sit', 'push-up', 'abdominal-crunch', 'step-up-onto-chair', 'squat', 'triceps-dip-on-chair', 'plank', 'high-knees-running-in-place', 'lunge', 'push-up-and-rotation', 'side-plank']
  })

  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .when('/step/:step', {
      templateUrl: 'templates/step.html',
      controller: 'StepsCtrl'
    })
    .when('/rest/:step', {
      templateUrl: 'templates/rest.html',
      controller: 'RestCtrl'
    })
    .when('/test', {
      templateUrl: 'templates/rest.html',
      controller: 'TestCtrl'
    })
    .when('/done', {
      templateUrl: 'templates/done.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  })

  .run(function(console, $rootScope, $location, $navigate, $route) {
    $rootScope.$location = $location;
    $rootScope.$navigate = $navigate;

    //$analytics.init('UA-1813303-9', 10);
    //$analytics.trackEvent('application', 'start');

    setTimeout(function() {
      navigator.splashscreen && navigator.splashscreen.hide();
    }, 150);
  })

  .controller('AppCtrl', function($scope, $location, $navigate, $routeParams, $countdown, audioFiles, workouts, workout) {

    $scope.exit = function() {
      $navigate.go('/', 'slideInFromLeft'); //cubeToLeft
    };
  });
