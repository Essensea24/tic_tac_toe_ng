angular
    .module("tictactoeApp")
    .controller("TicTacToeController", TicTacToeController);

 TicTacToeController.$inject = ['$firebaseArray']

 function TicTacToeController($firebaseArray) {
 	var self = this;
 	self.grid = getBox();
 	self.boxClick = boxClick;
 	self.game = getTurn();
 	self.clearBoard = clearBoard;
 	self.getWinner = getWinner;
 	self.scoreReset = scoreReset;

 	

 	//$loaded is an event listener that only run the loop when firebase data is loaded. 
 

 	function getBox() {
 		var ref = new Firebase("https://dailytictactoe.firebaseio.com/Grid");
 		var grid = $firebaseArray(ref);
 		return grid;
 	}

 	function getTurn(){
 		var ref = new Firebase("https://dailytictactoe.firebaseio.com/Game");
 		var game = $firebaseArray(ref);
 		return game;

 	}

 	function clearBoard() {
 			self.game[0].turn = 0
 			self.game.$save(self.game[0]);
 		for(var i =0; i<9; i++) {
 			self.grid[i].select = "empty";
 			self.grid.$save(i);
		}
 	}

 	function scoreReset() {
 		self.game[0].turn = 0
 		self.game.$save(self.game[0]);
 		for(var i =0; i<9; i++) {
 			self.grid[i].select = "empty";
 			self.grid.$save(i);
 		}
 	}


 	function boxClick(i) {
 		if (self.grid[i].select == 'empty' 
 			&& self.game[0].turn % 2 == 1) {
	 			self.grid[i].select = 'x';
	 			self.game[0].turn++;
	 			self.grid.$save(i)
				self.game.$save(self.game[0]);
				
 		} else if (self.grid[i].select == 'empty' 
 			&& self.game[0].turn % 2 == 0) {
 				self.grid[i].select = 'o';
 				self.game[0].turn++;
 				self.grid.$save(i)
				self.game.$save(self.game[0]);
 		} else {
 			null
 		}
		getWinner();
 	}

 	function getWinner() {
 		var tokens = ["x","o"]
 		var winners = [
 			[0, 1, 2],
 			[3, 4, 5],
 			[5, 7, 8],
 			[0, 3, 6],
 			[1, 4, 7],
 			[2, 5, 8],
 			[0, 4, 8],
 			[2, 4, 6]	
 		]

 		for(var i = 0; i<tokens.length; i++) {
 			var t = tokens[i];
 				for (var j = 0; j < winners.length ; j++) {
 					var w = winners[j]; //winner j row
 					if (self.grid[ w[0] ].select === t && self.grid[ w[1] ].select === t && self.grid[ w[2] ].select==t) {
 						console.log(t + "won")
 						if (t = "x") {
 							self.game[0].player1Score++;
 							self.game.$save(self.game[0]);
 						} else {
 							self.game[0].player2Score++;
 							self.game.$save(self.game[0]);
 						} 
 					}else if (self.grid[ w[0] ].select != t || self.grid[ w[1] ].select != t || self.grid[ w[2] ] != t) {
 						console.log("next player please!");
 					} else {
 						console.log("its a tie");
 					}
 				}
 		}
 	}


}



 	