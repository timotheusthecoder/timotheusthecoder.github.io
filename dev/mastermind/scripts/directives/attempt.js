'use strict';

angular.module('mastermindApp')
  .directive('attemptit', function(){
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'views/templates/attempt.html'
    };
  });
