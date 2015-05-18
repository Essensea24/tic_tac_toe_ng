angular
    .module("tictactoeApp")
    .controller("ChatBoxController", ChatBoxController);

 ChatBoxController.$inject = ['$firebaseArray']
 
 function ChatBoxController($firebaseArray) {
 	var self = this;
 	self getChat = getChat
 	

 	function getChat() {
 		var ref = new Firebase("https://coolchat24.firebaseio.com");
 		var chat = $firebaseArray(ref);
 		return chat;
 	}

 }
