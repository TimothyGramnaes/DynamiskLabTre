const shatForm = document.getElementById("message-form");
const shatContainer = document.querySelector(".chat-container");
const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit_button");
const leaveRoomBtn = document.getElementById("leave-room");
const roomDropdown = document.getElementById("chat-room");
const roomName = document.getElementById("output-room-name");
const userList = document.getElementById("users");
const typingMessageText = document.getElementById('typing-message')
const messageInput = document.getElementById('messagewritten')
// const roomNameInput = document.getElementById('room-name')

let currentUser = ''
let isPrivate = Boolean;

const socket = io("http://localhost:3000");

////////////////////////////////////////////////// ON CONNECT BÖRJAR /////////////////////////////////////////////////////////////////
socket.on("connect", () => {

  console.log("Du är connectad!");

  socket.on("activeRooms", (data) => {

    data.forEach((room) => {
      console.log('************', room)
      const option = document.createElement("option");
      if (room.isPrivate) {
        console.log('from forEach: room', room.name, 'is private, and password is:', room.password)
        option.innerText = room.name + ' - Privat';
      } else {
        console.log('from forEach: room', room.name, 'is NOT private')
        option.innerText = room.name
      }
      option.setAttribute("value", room.name);
      roomDropdown.appendChild(option);
    });
  });

  ///////////// Tar emot data ifrån login-form /////////////////
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = e.target.elements.username.value;
    currentUser = userName;
    const roomName = roomDropdown.value;
    const password = passwordInput.value;
    let roomObject = {}

    if (password) {
      isPrivate = true
      roomObject = {
        name: roomName,
        password: password,
        isPrivate
      }
    } else {
      isPrivate = false
       roomObject = {
        name: roomName,
        isPrivate
      }
    }

    
    console.log('Current Room Name is:', roomObject.name, 'and the password is:', roomObject.password)

    socket.emit("joinRoom", { username: userName, room: roomObject });
    
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("toggle-chat").classList.toggle("hidden");
  });
});

////////////////////// Skickar meddelande till HTML /////////////////

socket.on("message", function (message) {
  const div = document.createElement("div");
  div.classList.add("user-message");
  div.classList.add("glass-design-card");
  div.innerHTML = `<div class="message-header">
      <h5>${message.username}</h5>
      <p class="time">${message.time}</p>
      </div>
      <p class="message-body">
      ${message.text}
      </p>`;
  document.querySelector(".chat").appendChild(div);
  // scroll down upon writing messages
  shatContainer.scrollTo(0, document.body.scrollHeight);
  typingMessageText.innerHTML = '';
});

///////////////////// Tar emot data från chat-formet ///////////////

shatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const shatMsg = e.target.elements.messagewritten.value;

  // Send message to be read by the server
  socket.emit("shatMessage", shatMsg);

  // Empty and focus the textbox after sending a message
  e.target.elements.messagewritten.value = "";
  e.target.elements.messagewritten.focus();
});

// Listen for keypress and emit typing msg
shatForm.addEventListener('keypress', () => {
  socket.emit('typing', currentUser)
})

//////////// LEAVE SHAT ROOM ///////////
leaveRoomBtn.addEventListener("click", (e) => {
  location.reload();
});

/////////////////////////////////////////////////////////// ON CONNECT SLUTAR /////////////////////////////////////////////////

/////////// Recieved messages from the server for render

///////////////////////////////////// What Room and what users ////////////////////////////////////
socket.on("usersInRoom", ({ room, users }) => {
  showRoomName(room);
  showUsers(users);
});

// Output 'typing' text
socket.on('typing', (data) => {
  typingMessageText.innerHTML = `<p><em> ${data} is typing...`
})

///////////////////////////////////// Show roomname /////////////////////////////////////
function showRoomName(room) {
  if (room == "") {
    roomName.innerText = "Lobby";
  } else {
    roomName.innerText = room;
  }
}

//////////////////////// Show all users in channel//////////////////////
function showUsers(users) {
  userList.innerHTML = `
    ${users
      .map((user) => `<li> <i class="fas fa-user"></i>${user.username}</li>`)
      .join("")}`;
}

//////////////////////// Check if there is users in a channel/////////////////////
function channelIsEmpty(users) {
  return document.getElementById(users).innerHTML.trim() == "";
}
// If true there is users in channel
// console.log(channelIsEmpty("users"));
