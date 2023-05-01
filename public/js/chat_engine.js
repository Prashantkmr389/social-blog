const chatBox = document.querySelector(".chat-box");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector('.chat-input input[type="text"]');
const chatButton = document.querySelector(".chat-input button");

class chatEngine {
  constructor(chatBoxId, userEmail, userName) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.userName = userName;
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
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: "facebook",
          name : self.userName,
          // avatar : self.userAvatar,
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });

    // $("#messagesend-form").submit(function(e){
    //     e.preventDefault();
    //     let msg = $('#chat-message-input').val();
    //     if(msg != ''){
    //         self.socket.emit('send_message',{
    //             message : msg,
    //             user_email : self.userEmail,
    //             chatroom : 'facebook'
    //         });
    //     }
    // })

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

// chatButton.addEventListener("click", () => {
//   if (chatInput.value.trim() !== "") {
//     const message = document.createElement("div");
//     message.classList.add("message", "sent");
//     message.textContent = chatInput.value;
//     chatMessages.appendChild(message);
//     chatInput.value = "";
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }
// });

chatInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && chatInput.value.trim() !== "") {
    const message = document.createElement("div");
    message.classList.add("message", "sent");
    message.textContent = chatInput.value;
    chatMessages.appendChild(message);
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
