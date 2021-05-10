const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
const statusText = document.getElementById('status-text')
let optionValue = '';
let optionValuesArray = []

// const socket = io();

// const activeRooms = [];


createRoomBtn.addEventListener("click", () => {

	// loopa igenom alla option's "value" som sedan ska jämföras med det nya 'newRoom'
	optionValuesArray = Array.from(roomDropdown.options)
	
	optionValuesArray.every(function (optionElement) {
		optionValue = optionElement.value
	
		
		if (optionValue === newRoom.value) {
			console.log('The room name', optionValue, 'already exists')
			statusText.innerText = `A room called ${optionValue} already exists`
			statusText.style.color = 'red'
			return false
		} else {
			console.log('Option value:', optionValue)
			statusText.innerText = `The room ${newRoom.value} was added to list`
			statusText.style.color = 'green'
			return true
		}
	})
	
	
	
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
