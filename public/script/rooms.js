// const createRoomBtn = document.getElementById("create-room-btn");
// const roomDropdown = document.getElementById("chat-room");
// const newRoom = document.getElementById("room-name");

// const socket = io();

// const activeRooms = [];

// createRoomBtn.addEventListener("click", () => {
//   const newRoomName = newRoom.value;
//   const optionElement = document.createElement("option");

//   roomDropdown.appendChild(optionElement);
//   optionElement.setAttribute("value", newRoomName);
//   optionElement.innerText = newRoomName;
//   // console.log("New room created:", newRoomName);

//   activeRooms.push(newRoomName);
//   showActiveRooms();

//   socket.emit("activeRooms", activeRooms);
//   // return newRoomName;
// });

// //socket.on("")

// function showActiveRooms() {
//   // const rooms =
//   // console.log("funkar det?", activeRooms);
// }

// user joins shat
// function joiningUser(id, username, room) {
//   const user = { id, username, room };

//   users.push(user);

//   return user;
// }
