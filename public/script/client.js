const shatForm = document.getElementById("message-form");
const shatContainer = document.querySelector(".chat");

const roomName = document.querySelector(".room-name");
const userList = document.getElementById("users");

// Uses query-string to get the user and the room
// from the URL. Link: https://cdnjs.com/libraries/query-string
const { username, room } = Qs.parse(window.location.search, {
  // filter out all un-necessary symbols and only show letters
  ignoreQueryPrefix: true,
});

const socket = io();

// Joining shat
socket.emit("joinRoom", { username, room });

// Recieved messages from the server for render
socket.on("message", function (message) {
  //console.log(message);
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
  window.scrollTo(0, document.body.scrollHeight);
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

// Rendering messages from the server as content on the chat
// Tried adding it in to the socket.on("shatMessage") instead
//
// function renderMessage(message) {
//   console.log("render message");
//   const div = document.createElement("div");
//   div.classList.add("user-message");
//   div.innerHTML = `<div class="message-header">
//     <h5>Bosse</h5>
//     <p class="time">13:46</p>
//     </div>
//     <p class="message-body">
//     ${message}
//     </p>`;
//   document.querySelector(".chat").appendChild(div);
// }

// Show roomname
function showRoomName(room) {
  roomName.innerText = room;
}

// Show all users in channel
function showUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}`;
}
