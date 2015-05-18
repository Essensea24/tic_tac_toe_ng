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
 	self.setTimeOut = setTimeOut;
 	// self.getChat = getChat
 	// self.addChat = addChat;

 	// function addChat() {
 	// 	alert("addchat is running")
 	// 	self.chatBox[0].text = "hi";
 	// 	self.game.$save(self.game[0]);
 	// 	self.game[0].chat.text.$add({text: self.game[0].chat});
 	// }	

 	// function addTodo(){
  //           self.todos.$add({task: self.text, done: false});
  //           self.text = null;
    
  //       }



 	//$loaded is an event listener that only run the loop when firebase data is loaded. 
 	
 	function setTimeOut() {
 		var timeOut = setTimeout(clearBoard, 2000);

 	}

 	function getChat(){
 		var ref = new Firebase("https://dailytictactoe.firebaseio.com/chatBox")
 		var chatBox = $firebaseArray(ref);
 		return chatbox;
 		
 	}
 	

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
 			self.game[0].message = "";
 			self.game[0].winner = false;
 			self.game.$save(self.game[0]);
 		for(var i =0; i<9; i++) {
 			self.grid[i].select = "empty";
 			self.grid.$save(i);

		}
 	}

 	function scoreReset() {
 		self.game[0].player1Score = 0;
 		self.game[0].player2Score = 0;
 		self.game[0].turn = 0;
 		self.game[0].winner = false;
 		self.game[0].message = "";
 		self.game.$save(self.game[0]);
 		for(var i =0; i<9; i++) {
 			self.grid[i].select = "empty";
 			self.grid.$save(i);
 		}
 	}


 	function boxClick(i) {
 		if (self.game[0].turn <= 9 && self.game[0].winner == false){
	 		if (self.grid[i].select == 'empty' 
	 			&& self.game[0].turn % 2 == 0) {
		 			self.grid[i].select = 'x';
		 			self.game[0].turn++;
		 			self.grid.$save(i)
					self.game.$save(self.game[0]);
					
	 		} else if (self.grid[i].select == 'empty' 
	 			&& self.game[0].turn % 2 == 1) {
	 				self.grid[i].select = 'o';
	 				self.game[0].turn++;
	 				self.grid.$save(i)
					self.game.$save(self.game[0]);
	 		} else {
	 			null
 			}
 			getWinner();
 		}
 	}

 	function getWinner() {
 		var tokens = ["x","o"]
 		var winners = [
 			[0, 1, 2],
 			[3, 4, 5],
 			[6, 7, 8],
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
 						if (t == "x") {
 							self.game[0].player1Score++;
 							self.game[0].winner = true;
 							self.game[0].message = "Player 1 Won!";
 							// setTimeOut();
 						} else if (t == "o") {
 							self.game[0].player2Score++;
 							self.game[0].message = "Player 2 Won!";
 							self.game[0].winner = true;
 							// setTimeOut();
 						} 
 					} else if (self.game[0].turn === 9) {
 						self.game[0].message = "It is a tie!"
 					}
 					self.game.$save(self.game[0])
 				}
 		}

 	}


}






 	