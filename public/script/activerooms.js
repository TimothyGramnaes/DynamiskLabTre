const selectMenu = document.getElementById("chat-room");

const socket = io();

const activeRooms = [];

socket.on("activeRooms", (roomNames) => {
  // console.log(`Oliver fyller 20 ${roomNames}`);
  activeRooms.push(roomNames);

  console.log(activeRooms);
  displayActiveRooms();
});

function displayActiveRooms() {
  const option = document.createElement("option");
  selectMenu.appendChild(option);

  

  option.innerHTML = 
}

// <label for="chat-room">Active rooms</label>
// <select name="chat-room" id="chat-room">
//   <option value="Lobby">Lobby(default)</option>
// </select>

// roomDropdown.appendChild(optionElement);
//   optionElement.setAttribute("value", newRoomName);
//   optionElement.innerText = newRoomName;

//   // Renders message to DOM
//   const div = document.createElement("div");
//   div.classList.add("user-message");
//   div.innerHTML = `<div class="message-header">
//     <h5>${message.username}</h5>
//     <p class="time">${message.time}</p>
//     </div>
//     <p class="message-body">
//     ${message.text}
//     </p>`;
//   document.querySelector(".chat").appendChild(div);
