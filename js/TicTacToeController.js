angular
    .module("tictactoeApp")
    .controller("TicTacToeController", TicTacToeController);

 TicTacToeController.$inject = ['$firebaseArray'];


 function TicTacToeController() {
 	var self = this;
 	self.boxList = [
 	{box:1, select: false},
 	{box:2, select: false},
 	{box:3, select: false},
 	{box:4, select: false},
 	{box:5, select: false},
 	{box:6, select: false},
 	{box:7, select: false},
 	{box:8, select: false},
 	{box:9, select: false}

 	]
 }