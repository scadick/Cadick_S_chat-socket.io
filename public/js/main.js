(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = document.querySelector('.message'),
      nickName = null;

  function setNickname() {
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e) {
    e.preventDefault(); //prevent the default behaviour - a submit triggers a page reload, which we don't want

    // ternary -> check to see if the variable exists, and handle if it does, or if it doesn't. true is to the left of the colon, false to the right
    nickName = (nickName && nickName.length > 0) ? nickName : 'user';

    // grab the text from the input field at the bottom of the page
    msg = `${nickName} says ${chatMessage.value}`;

    // grab the chat event so that we can pass it through to the server (and everyone else)
    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  function appendMessage(msg) {
    //debugger;
    let newMsg = `<li>${msg.message}<li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg) {
    //debugger;
    let newMsg = `<li>${msg}<li>`;
    messageList.innerHTML += newMsg;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('chat message', appendMessage, false);
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
