angular
    .module("tictactoeApp")
    .controller("TicTacToeController", TicTacToeController);

 TicTacToeController.$inject = ['$firebaseArray'];


 function TicTacToeController($firebaseArray) {
 	var self = this;
 	self.boxClick= boxClick;
 	self.addBox = getBox();
 	self.getWinner = getWinner;
 	

 	//$loaded is an event listener that only run the loop when firebase data is loaded. 
 	self.addBox.$loaded( function () {
 		//set a for loop to add boxes if the number of box is less than 9, then stop at 9 boxes
 		if (self.addBox.length <9 ){
 			for (var i=0; i<9; i++) {
 				//set addBox.select to an empty string
 				self.addBox.$add({select: "", player: "o"});//need to know
 			}
 		}

 	});


 	function getBox() {
 		var ref = new Firebase("https://dailytictactoe.firebaseio.com/");
 		var box = $firebaseArray(ref);
 		return box 
 	}

 	self.clearBoard = clearBoard;
 	//set select value to ""
 	function clearBoard(){
 		for(var i =0; i<9; i++) {
 			self.addBox[i].select = "";
 			self.addBox[i].player = "o";
 			self.addBox.$save(i);
 		}
 
 	}

 	function boxClick(e) {
 		if (self.addBox[e].select == "") {
 			if (self.addBox[e].player == "o") {
 				self.addBox[e].select = "x";
 				self.addBox[e].player = "x";//how to change the value of player for all box to "x"?
 				self.addBox.$save(e); // if that is impossible then try inject an firebaseObject into tttcontroler
 			}
 		}
 	}

 	
 	function getWinner() {
 		//horizontal check
 		if ((self.addBox[0].select ==="x" && self.addBox[1].select ==="x" && self.addBox[2].select ==="x" ) || (self.addBox[0].select ==="o" && self.addBox[1].select ==="o" && self.addBox[2].select ==="o" )){
 				console.log(self.addBox[0].select + " 1won") 

 		} else if ((self.addBox[3].select ==="x" && self.addBox[4].select ==="x" && self.addBox[5].select ==="x" ) || (self.addBox[3].select ==="o" && self.addBox[4].select ==="o" && self.addBox[5].select ==="o" )){
 				console.log(self.addBox[3].select + " 2won")
 		}else if ((self.addBox[6].select ==="x" && self.addBox[7].select ==="x" && self.addBox[8].select ==="x" ) || (self.addBox[6].select ==="o" && self.addBox[7].select ==="o" && self.addBox[8].select ==="o" )){
 				console.log(self.addBox[6].select + " 3won")
 			//vertical check
 		} else if ((self.addBox[0].select ==="x" && self.addBox[3].select ==="x" && self.addBox[6].select ==="x" ) || (self.addBox[0].select ==="o" && self.addBox[3].select ==="o" && self.addBox[6].select ==="o" )){
 				console.log(self.addBox[0].select + " 4won")
 		} else if ((self.addBox[1].select ==="x" && self.addBox[4].select ==="x" && self.addBox[7].select ==="x" ) || (self.addBox[1].select ==="o" && self.addBox[4].select ==="o" && self.addBox[7].select ==="o" )){
 				console.log(self.addBox[1].select + " 5won")
 		} else if ((self.addBox[2].select ==="x" && self.addBox[5].select ==="x" && self.addBox[8].select ==="x" ) || (self.addBox[2].select ==="o" && self.addBox[5].select ==="o" && self.addBox[8].select ==="o" )){
 				console.log(self.addBox[2].select + " 6won")
 			//diagonal check
 		} else if ((self.addBox[0].select ==="x" && self.addBox[4].select ==="x" && self.addBox[8].select ==="x" ) || (self.addBox[0].select ==="o" && self.addBox[4].select ==="o" && self.addBox[8].select ==="o" )){
 				console.log(self.addBox[0].select + " 7won")
 		} else if ((self.addBox[2].select ==="x" && self.addBox[4].select ==="x" && self.addBox[6].select ==="x" ) || (self.addBox[2].select ==="o" && self.addBox[4].select ==="o" && self.addBox[6].select ==="o" )){
 				console.log(self.addBox[2].select + " 8won")
 		} else if (self.addBox[0].select == "" || self.addBox[1].select =="" ||
				self.addBox[2].select == "" || self.addBox[3].select =="" ||
				self.addBox[4].select == "" || self.addBox[5].select =="" ||
				self.addBox[6].select == "" || self.addBox[7].select =="" ||
				self.addBox[8].select == "") {
 			console.log("keep going");
 		} else {
 			console.log("it's a tie")
 			
		}

 	}
 		
}

