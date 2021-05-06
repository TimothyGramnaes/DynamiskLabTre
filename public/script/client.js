const shatForm = document.getElementById("message-form");
const shatContainer = document.querySelector(".chat-container");
const roomNameInput = document.getElementById('room-name')
const usernameInput = document.getElementById('username')
const joinChatBtn = document.getElementById('join-chat-btn')


// const roomName = document.querySelector(".room-name");
const roomName = document.getElementById("output-room-name");
const userList = document.getElementById("users");

// Uses query-string to get the user and the room
// from the URL. Link: https://cdnjs.com/libraries/query-string
const { username, room } = Qs.parse(window.location.search, {
  // filter out all un-necessary symbols and only show letters
  ignoreQueryPrefix: true,
});

const socket = io();

window.onload = function() {
  setupListerners()
}

function setupListerners() {
  socket.on('joined-room', onJoinRoom)
  socket.on('rooms-update', onRoomsUpdate)
  // socket.on('', functionName)
  // socket.on('', functionName)
  console.log('setupListeners säger hej')

  joinChatBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('show chat ui')

    const container = document.querySelector('.container')
    const chatViewContainer = document.querySelector('.chat-view-container')
    const body = document.querySelector('body')

    container.classList.add('hidden')
    chatViewContainer.classList.remove('hidden')
    body.classList.remove('start-page-body')
  })
}

function onJoinRoom() {
  console.log('onJoinRoom säger hej')
  const nameABC = usernameInput.value
  const roomNameABC = roomNameInput.value
  console.log(nameABC, roomNameABC)
}

function onRoomsUpdate(rooms) {
  console.log('onRoomsUpdate säger hej')
  /*
  const container = **document.get container for rooms list**
  const items = []

  for (const roomName of rooms) {
    const item = document.createElement('div')
    items.push(item)
    item.innerText = roomName
    item.classList.add('item')
    if (room === roomName) {
      item.classList.add('active')
    }
  }

  container.innerHTML = null
  container.append(...items)
  */
}

socket.emit("joinRoom", { username, room });
// Joining shat

socket.on('rooms-update', (rooms) => {
  console.log(rooms)
})

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
  if (room == "") {
    roomName.innerText = "Lobby (default)";
  } else {
    roomName.innerText = room;
  }
}

// Show all users in channel
function showUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}`;
}
