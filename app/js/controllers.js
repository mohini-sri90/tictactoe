'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('GameCtrl', ['$scope',
        function($scope) {
            $scope.numArr;
            $scope.numbers = [3, 4, 5, 6, 7, 8, 9, 10];
            $scope.player = "X";
            $scope.board;
            $scope.change = function(numArr, board) {
                numArr = new Array($scope.mySelect);
                board = new Array($scope.mySelect);
                for (var i = 0; i < $scope.mySelect; i++) {
                    numArr[i] = i;
                    board[i] = new Array($scope.mySelect);
                }
                $scope.board = board;
                $scope.numArr = numArr;
            }

            $scope.newGame = function() {
                for (var i = 0; i < $scope.mySelect; i++) {
                    for (var j = 0; j < $scope.mySelect; j++) {
                        setCell(i, j, null)
                    }
                }
                $scope.player = "X";
                $scope.winner = null;
            }

            $scope.cellClass = function(row, col) {
                var value = cell(row, col)
                return 'cell cell-' + value
            }

            $scope.cellText = function(row, col) {
                var value = cell(row, col)
                return value ? value : ' '
            }
            $scope.cellClick = function(row, col) {
                if (cellIsSet(row, col)) {
                    alert('You cannot edit this cell');
                    return
                }
                if ($scope.winner) {
                    alert('Already game over.')
                    return
                }

                setCell(row, col, $scope.player);
                checkBoard(row, col, $scope.player);
                $scope.player = nextPlayer($scope.player);
                if ($scope.winner) {
                    $scope.newGame();
                    return;
                }
            }


            // returns the value of cell
            function cell(row, col) {
                return $scope.board[row][col]
            }

            function cellIsSet(row, col) {
                if ($scope.board[row][col])
                    return 1;
                else
                    return 0;
            }

            // sets the value of cell
            function setCell(row, col, value) {
                $scope.board[row][col] = value;
            }

            function checkBoard(row, col, player) {
                var empty = false

                for (var i = 0; i < $scope.mySelect; i++) {
                    for (var j = 0; j < $scope.mySelect; j++) {
                        if (!cell(i, j)) empty = true
                    }
                }

                if (!empty) {
                    $scope.winner = 'NONE'
                    alert("Game has finished with no winner");
                    return
                }

                // check board vertically and horizontally
                var continuedrow = 1,
                    continuedcol = 1;
                for (var i = 1; i < $scope.mySelect; i++) {
                    if (!(cell(i - 1, col) && cell(i, col) && cell(i - 1, col) == cell(i, col) && continuedrow)) {
                        continuedrow = 0;
                    }
                    if (!(cell(row, i - 1) && cell(row, i) && cell(row, i) == cell(row, i - 1) && continuedcol)) {
                        continuedcol = 0;
                    }
                }
                if (continuedrow || continuedcol) {
                    $scope.winner = player;
                    alert("The winner is " + $scope.winner);
                    return
                }
                // check board diagonally
                var continueddiag = 0,
                    continueddiagopp = 0;
                if (row == col) {
                    continueddiag = 1;
                    for (var i = 1; i < $scope.mySelect; i++) {
                        var prev = cell(i - 1, i - 1);
                        if (!(cell(i, i) && prev && cell(i, i) == prev && continueddiag))
                            continueddiag = 0;
                    }
                }
                if ((row + col == $scope.mySelect - 1)) {
                    continueddiagopp = 1;
                    for (var i = 1; i < $scope.mySelect; i++) {
                        var prev = cell($scope.mySelect - i, i - 1);
                        if (!(cell($scope.mySelect - i - 1, i) && prev && cell($scope.mySelect - i - 1, i) == prev && continueddiagopp)) {
                            continueddiagopp = 0;
                        }
                    }
                }

                if (continueddiag || continueddiagopp) {
                    $scope.winner = player;
                    alert("The winner is " + $scope.winner);
                }
                return
            }


            // returns the next player
            function nextPlayer(player) {
                if (player == "X")
                    return "O";
                else
                    return "X";
            }


        }
    ]);