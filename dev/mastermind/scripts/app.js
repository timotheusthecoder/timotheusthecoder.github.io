'use strict';

/**
 * @ngdoc overview
 * @name mastermindApp
 * @description
 * # mastermindApp
 *
 * Main module of the application.
 */
angular
  .module('mastermindApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mastermind.html',
        controller: 'MastermindctrlCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
