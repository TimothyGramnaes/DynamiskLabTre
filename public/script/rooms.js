const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')

// const socket = io();

// const activeRooms = [];


createRoomBtn.addEventListener("click", () => {
	// loppa igenom alla option's "value" som sedan kan jämföras med det nya 'newRoom'
	Array.from(roomDropdown.options).forEach(function (optionElement) {
		let optionValue = optionElement.value
	
		console.log('Option value:', optionValue)

		return optionValue;
	})
	
	// if (optionValue === newRoom) {
	// 	console.log('this room already exists')
	// } else {
	// 	const newRoomName = newRoom.value;
	
	// 	const optionElement = document.createElement("option");
	// 	roomDropdown.appendChild(optionElement);
	// 	optionElement.setAttribute("value", newRoomName);
	// 	optionElement.innerText = newRoomName;
		
	// 	console.log("New room created:", newRoomName);
	// }

	// =============== console.log value of selected option in dropdown menu
	// const x = roomDropdown.selectedIndex
	// const selectedOptionValue = document.getElementsByTagName('option')[x].value
	// console.log(selectedOptionValue, 'is currently selected in dropdown')
	// ============== Början på if sats för check roomDropdown har en option med samma value som newRoom
	// if ('roomDropdown har en option med samma value som newRoom') {
	// 	console.log('found duplicate')
	// } else {
	// 	console.log('didnt find duplicate')
	// 	const newRoomName = newRoom.value;
	
	// 	const optionElement = document.createElement("option");
	// 	roomDropdown.appendChild(optionElement);
	// 	optionElement.setAttribute("value", newRoomName);
	// 	optionElement.innerText = newRoomName;
	
	// 	console.log("New room created:", newRoomName);
	// }
	
	
	// ========== ORIGINALKOD NEDANFÖR =========================================== //
	
	// const newRoomName = newRoom.value;
	
	// const optionElement = document.createElement("option");
	// roomDropdown.appendChild(optionElement);
	// optionElement.setAttribute("value", newRoomName);
	// optionElement.innerText = newRoomName;
	
	// console.log("New room created:", newRoomName);
	
	// ========== ORIGINALKOD OVANFÖR ============================================ //
	
	// if (optionElement.value === 'value på ett annat option element')
	// console.log(option.value)

	// ============ Potentiallt onödig kod?
  // activeRooms.push(newRoomName);
  // //   showActiveRooms();

  // socket.emit("activeRooms", activeRooms);
  // console.log(activeRooms);
});

//socket.on("")

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
