const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
let optionValue = '';
const listOfOptionValues = []

// const socket = io();

// const activeRooms = [];


createRoomBtn.addEventListener("click", () => {

	// loopa igenom alla option's "value" som sedan ska jämföras med det nya 'newRoom'
	Array.from(roomDropdown.options).forEach(function (optionElement) {
		optionValue = optionElement.value
	
		console.log('Option value:', optionValue)

		// const checkForDuplicateRoomNames = listOfOptionValues.includes(newRoom)
		// listOfOptionValues.push(optionValue)
	})
	
	// console.log('arrayen:', listOfOptionValues)
	// const checkForDuplicateRoomNames = listOfOptionValues.includes(newRoom)
	// console.log(checkForDuplicateRoomNames)

	if (optionValue === newRoom) {
		console.log('room already exists')
	} else {
		// problem: optionValue sätts till det sista i listan, vilket är 'Kloaken'
		console.log('optionValue är:', optionValue)
		const newRoomName = newRoom.value;
	
		const optionElement = document.createElement("option");
		roomDropdown.appendChild(optionElement);
		optionElement.setAttribute("value", newRoomName);
		optionElement.innerText = newRoomName;
		
		console.log("New room created:", newRoomName);
	}
	
	
	
	// ========== ORIGINALKOD NEDANFÖR =========================================== //
	
	// const newRoomName = newRoom.value;
	
	// const optionElement = document.createElement("option");
	// roomDropdown.appendChild(optionElement);
	// optionElement.setAttribute("value", newRoomName);
	// optionElement.innerText = newRoomName;
	
	// console.log("New room created:", newRoomName);
	
	// ========== ORIGINALKOD OVANFÖR ============================================ //




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
