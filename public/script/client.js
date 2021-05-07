const shatForm = document.getElementById("message-form");
const shatContainer = document.querySelector(".chat-container");
const loginForm = document.getElementById("login-form")
// const roomName = document.querySelector(".room-name");
const roomName = document.getElementById("output-room-name");
const userList = document.getElementById("users");

// Uses query-string to get the user and the room
// from the URL. Link: https://cdnjs.com/libraries/query-string
//const { username, room } = Qs.parse(window.location.search, {
// filter out all un-necessary symbols and only show letters
// ignoreQueryPrefix: true,
//});

const socket = io();
socket.on('connection', () => {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.elements.username.value
    const roomName = e.target.elements.roomname.value
    socket.emit("joinRoom", { username: userName, room: roomName });
  })
})
// Joining shat

// Recieved messages from the server for render
socket.on("message", function (message) {
  // Renders message to DOM
  const div = document.createElement("div");
  div.classList.add("user-message");
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

  console.log(roomName);
});

// What Room and what users
socket.on("usersInRoom", ({ room, users }) => {
  showRoomName(room);
  showUsers(users);
});

shatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const shatMsg = e.target.elements.messagewritten.value;

  // Send message to be read by the server
  socket.emit("shatMessage", shatMsg);

  // Empty and focus the textbox after sending a message
  e.target.elements.messagewritten.value = "";
  e.target.elements.messagewritten.focus();
});

// Show roomname
function showRoomName(room) {
  console.log("kör showRoomName funktionen");
  if (room == "") {
    roomName.innerText = "Lobby(default)";
  } else {
    roomName.innerText = room;
  }
  console.log("room är: ", room);
  console.log("roomName är: ", roomName.innerText);
}

// Show all users in channel
function showUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}`;
}

// // Check if there is users in a channel
// function channelIsEmpty(users) {
//   return document.getElementById(users).innerHTML.trim() == "";
// }
// // If true there is users in channel
// console.log(channelIsEmpty("users"));
////////////// stänger form ////////////

function closeFormEditor() {
  document.getElementById("toggle-chat").classList.toggle("hidden")
  document.getElementById("loginForm").classList.toggle("hidden")
  //chatBox.style.display = "flex"
}
function closeLogginForm() {
  const loginForm = document.getElementById("loginForm")
  loginForm.style.display = "none"
}