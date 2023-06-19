const chatBox = document.querySelector(".chat-box");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector('.chat-input input[type="text"]');
const chatButton = document.querySelector(".chat-input button");

class chatEngine {
  constructor(chatBoxId, userEmail, userName, userId) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.userName = userName;
    this.user = userId;
    // this.userAvatar = userAvatar;

    this.socket = io.connect("http://127.0.0.1:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }
  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");
    });

    self.socket.emit("join_room", {
      user_email: self.userEmail,
      chatroom: "facebook",
      // avatar : self.userAvatar,
      name : self.userName,
    });

    self.socket.on("user_joined", (data) => {
      console.log("a user joined", data);
    });

    $("#send-message").click(function () {
      let msg = $("#chat-message-input").val();
      $("#chat-message-input").val("");
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "facebook",
          name : self.userName,
          user : self.user,
          // avatar : self.userAvatar,
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
      }
    });

    

    self.socket.on("receive_message", (data) => {
      console.log("message received", data.message);
      let newMessage = $("<div>");
      let messageType = "received";
      if (data.user_email == self.userEmail) {
        messageType = "sent";
      }
      newMessage.append(
        $("<p>", {
          html: data.message,
        })
      );
      newMessage.append($('<small>',{html : data.name}))
      // newMessage.append($('<img>',{id: 'avatar', src: data.avatar}))
      
      newMessage.addClass(messageType);
      $("#messages").append(newMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }
}
// Using jQuery event listener for Enter key press
$(document).ready(() =>{
    $('#chat-message-input').keypress(function(e){
      if(e.keyCode == 13){
        $('#send-message').click();
      }
    })

  })



