'use strict';

/**
 * @ngdoc function
 * @name mastermindApp.controller:MastermindctrlCtrl
 * @description
 * # MastermindctrlCtrl
 * Controller of the mastermindApp
 */
angular.module('mastermindApp')
  .controller('MastermindctrlCtrl', function ($scope) {

    $scope.secretPegs = [];
    $scope.attempts = [];
    $scope.correctPegs = 0;
    $scope.availableColors = ['blue','green','red','yellow','white','black'];

    var paintRow = function () {
      var attempt = new Attempt();

      for(var j=0;j<4;j++){
        attempt.pegs[j] = new Peg('empty');
        attempt.results[j] = new Peg('empty');
        attempt.results[j].size = 'tiny';
      }

      $scope.attempts.unshift(attempt);
    };

    var setSecret = function () {
      for(var i=0;i<4;i++){
        $scope.secretPegs[i] = new Peg(shuffle($scope.availableColors.slice())[0]);
      }

    };

    $scope.switchColor = function (index, peg) {
      switch(peg.color){
        case 'empty' : peg.color = 'blue'; break;
        case 'blue'  : peg.color = 'red'; break;
        case 'red'   : peg.color = 'yellow'; break;
        case 'yellow': peg.color = 'green'; break;
        case 'green' : peg.color = 'black'; break;
        case 'black' : peg.color = 'white'; break;
        case 'white' : peg.color = 'empty'; break;
      }
    };

    $scope.validateGuess = function (index) {
      var results = [];
      var matched = [];
      var missed = [];
      $scope.correctPegs = 0;

      // check for matching placement and color
      for(var i=0;i<4;i++) {

        if($scope.attempts[index].pegs[i].color === $scope.secretPegs[i].color) {
          var peg = new Peg('black');
          peg.size = 'tiny';
          results.push(peg);
          matched.push(i);
          $scope.correctPegs++;
        }
        else{
          missed.push(i);
        }
      }

      // check for matching color with incorrect placement
      if(missed.length>0){
        for(i=0;i<missed.length;i++) {
          for(var j=0;j<missed.length;j++) {

            if($scope.secretPegs[missed[i]].color === $scope.attempts[index].pegs[missed[j]].color) {
              var almostPeg = new Peg('white');
              almostPeg.size = 'tiny';
              results.push(almostPeg);
              break;
            }
          }
        }
      }

      $scope.attempts[index].results = shuffle(results);

      if($scope.attempts.length===10){
        $scope.currentAttempt = -1;
      }
      else {
        readyNextAttempt();
      }
    };

    var readyNextAttempt = function(){
      paintRow();
    };

    var shuffle = function (o) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    $scope.reset = function () {
      $scope.currentAttempt = 0;
      $scope.correctPegs = 0;
      $scope.attempts = [];
      readyNextAttempt();
      setSecret();
    };

    var init = function () {
        $scope.reset();
    };

    init();

  });
