angular
    .module("tictactoeApp")
    .controller("TicTacToeController", TicTacToeController);

 TicTacToeController.$inject = ['$firebaseArray'];


 function TicTacToeController($firebaseArray) {
 	var self = this;

 	self.boxClick= boxClick;
 	self.player1 = "x";
 	self.player2 = "o";
 	self.turn = "o";
 	self.addBox = getBox();
 	self.addBox.$loaded( function () {
 		if (self.addBox.length <9 ){
 			for (var i=0; i<9; i++) {
 				self.addBox.$add({select: ""});
 			} 

 		}
 	});

 

 	function getBox() {
 		var ref = new Firebase("https://dailytictactoe.firebaseio.com/");
 		var box = $firebaseArray(ref);
 		return box 
 	}

 	function boxClick(e) {
 		if (self.addBox[e].select== "" && self.turn == "o") {
 			self.addBox[e].select = self.player1;
 			console.log(self.addBox[e].select);
 			self.turn = "x";
 			console.log("next is " + self.turn + " turn");
 			self.addBox.$save(e);
 		} else if (self.addBox[e].select== "" && self.turn == "x") {
 			self.addBox[e].select = self.player2;
 			console.log(self.addBox[e].select);
 			self.turn = "o";
 			console.log("next is " + self.turn + " turn");
 		} else {
 			null
 		}
 	}
 }

