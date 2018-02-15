(function() {
	const socket = io(); // a constant is a variable that should never change (remains constant)
	//const nName = "julio";

	let messageList = document.querySelector('ul'),
			chatForm 	= document.querySelector('form'),
			nameInput	= document.querySelector('.nickname'),
			nickName 	= null,
			chatMessage = chatForm.querySelector('.message');

	function setNickname() {
		nickName = this.value;
	}

	function handleSendMessage(e) {
		e.preventDefault(); // kill form submit
		nickName = (nickName && nickName.length > 0) ? nickName : 'user';
		msg = `${nickName} says ${chatMessage.value}`;

		socket.emit('chat message', msg);
		chatMessage.value = '';
		return false;
	}

	function appendMessage(msg) {
		// will it get passed thru?
		debugger;
		let newMsg = `<li>${msg.message}</li>`
		messageList.innerHTML += newMsg;
	}

	function appendDMessage(msg) {
		let newMsg = `<li>${msg}</li>`
		messageList.innerHTML += newMsg;
	}

	nameInput.addEventListener('change', setNickname, false);
	chatForm.addEventListener('submit', handleSendMessage, false);
	socket.addEventListener('chat message', appendMessage, false);
	socket.addEventListener('disconnect message', appendDMessage, false);

	//create variables
	var typing = false;
	var timeout = undefined;
	//create a timeout function to insert when the user stops typing
	function timeoutFunction(){
	  typing = false;
	  socket.emit('.noLongerTypingMessage');
	}
	//function to say that a user is typing after he starts typing
	function typingMessage(){
	  if(typing == false) {
	    typing = true
	    socket.emit('.typingMessage');
	    timeout = setTimeout(timeoutFunction, 5);
	  } else {
	    clearTimeout(timeout);
	    timeout = setTimeout(timeoutFunction, 5);
	  }

	}
//display message that user is typing
	socket.on('is typing', function(data){
  	socket.broadcast.emit('typing', {nickName});
	});
})();
