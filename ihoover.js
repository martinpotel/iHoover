/* 
    POTEL Martin
    28-03-2017
    iHoover
*/


angular.module('ngIHoover', []).controller('ihooverCtrl', function($scope, $timeout, $window) {

    $scope.directions = ['N', 'E' , 'S', 'W'];

    var COLORS = {
      HOOVER: '#0DFF00',
      BOARD: '#000',
      CLEANED: '#f5f5f0'
    };


    $scope.start = function () {
        $scope.gridSizeX = 8;
        $scope.gridSizeY = 8;
      
        $scope.hoover = {
          direction :"N",
          position: {
            x: $scope.gridSizeX/2,
            y: $scope.gridSizeY/2 
          }
        };  
        $scope.setupBoard();
    }

    
    $scope.setStyling = function(col, row) {
        if ($scope.hoover.position.x == row && $scope.hoover.position.y == col) return COLORS.HOOVER;
        else if ($scope.board[col][row] === true) return COLORS.CLEANED;
        else  return COLORS.BOARD;
    };


    $scope.setupBoard = function () {
      $scope.board = [];
      for (var i = 0; i < $scope.gridSizeY; i++) {
        $scope.board[i] = [];
        for (var j = 0; j < $scope.gridSizeX; j++) {
          $scope.board[i][j] = false;
        }
      }
    }
    
    $scope.clean = function () {
        for (var i= 0; i < $scope.commands.length;i++) {
            executeCommand($scope.commands[i]);
        }
    }


    function executeCommand(command) {
        if (command === 'D' || command === 'G') changeDirection(command);
        if (command === 'A') goForward();
    }

    function changeDirection(dir) {
        if (dir == 'D') {
            if ($scope.directions.indexOf($scope.hoover.direction) === $scope.directions.length-1 ) $scope.hoover.direction = 0;
            else $scope.hoover.direction = $scope.directions[$scope.directions.indexOf($scope.hoover.direction)+1];
        }
        if (dir == 'G') {
            if ($scope.directions.indexOf($scope.hoover.direction) === 0 )  $scope.hoover.direction = $scope.directions[$scope.directions.length-1]; 
            else $scope.hoover.direction = $scope.directions[$scope.directions.indexOf($scope.hoover.direction)-1];
        }
           
    }

    function goForward() {
        $scope.board[$scope.hoover.position.y][$scope.hoover.position.x] = true;
        if ($scope.hoover.direction === "W") {
           if ($scope.hoover.position.x > 0) $scope.hoover.position.x -= 1;
        } else if ($scope.hoover.direction === "E") {
            if ($scope.hoover.position.x < $scope.board[0].length-1) $scope.hoover.position.x += 1;
        } else if ($scope.hoover.direction === "N") {
            if ($scope.hoover.position.y > 0) $scope.hoover.position.y -= 1;
        } else if ($scope.hoover.direction === "S") {
            if ($scope.hoover.position.y < $scope.board[0].length-1 ) $scope.hoover.position.y += 1;
        }
    }

    $scope.checkCommands = function () {
        return false;
    }

    $scope.start();
  });