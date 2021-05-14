const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
const statusText = document.getElementById('status-text')
const passwordInput = document.getElementById('room-password')
let createdRoom = {}

let optionValuesArray = []
let isUnique = Boolean;
let isPrivateRoom = Boolean;


createRoomBtn.addEventListener("click", () => {

	if (passwordInput.value != '') {
		isPrivateRoom = true
	} else {
		isPrivateRoom = false
	}

	roomNameIsUnique()

	if (isUnique) {
		if (isPrivateRoom) {
			// room object with psw
			// createdRoom = {
			// 	name: newRoom.value,
			// 	password: passwordInput.value
			// }
			// console.log('New private room:', createdRoom)

			const newRoomName = newRoom.value;
			const optionElement = document.createElement("option");
			roomDropdown.appendChild(optionElement);
			optionElement.setAttribute("value", newRoomName);
			optionElement.innerText = newRoomName + ' - Privat';
		
			console.log("New room created:", newRoomName);

		} else {
			// room object without psw
			// const createdRoom = {
			// 	name: newRoom.value
			// }
			// console.log('New public room:', createdRoom)

			const newRoomName = newRoom.value;
			const optionElement = document.createElement("option");
			roomDropdown.appendChild(optionElement);
			optionElement.setAttribute("value", newRoomName);
			optionElement.innerText = newRoomName;
		
			console.log("New room created:", newRoomName);
		}
	}
});


function roomNameIsUnique() {
	// Create an array of the option elements "value" attributes
	optionValuesArray = Array.from(roomDropdown.options)

	// Loop through array to check for duplicates
	optionValuesArray.every(function (optionElement) {
		let optionValue = optionElement.value

		// Check if <option value="___"> is same as newRoom.value
		if (optionValue === newRoom.value) {
			console.log('The room name', optionValue, 'already exists')
			statusText.innerText = `A room called ${optionValue} already exists`
			statusText.style.color = 'rgba(107, 0, 0, 1)'
			isUnique = false
			return false // to break the loop
		} else {
			console.log('Option value:', optionValue)
			statusText.innerText = `The room ${newRoom.value} was added to list`
			statusText.style.color = 'rgba(26, 255, 121, 1)'
			isUnique = true // to create room
			return true
		}
	})
	console.log(optionValuesArray)
}


// function createRoom() {
// 	const newRoomName = newRoom.value;

// 	const optionElement = document.createElement("option");
// 	roomDropdown.appendChild(optionElement);
// 	optionElement.setAttribute("value", newRoomName);

// 	if (isPrivateRoom) {
// 		optionElement.innerText = newRoomName + ' (Låst)';
// 	}
// 	optionElement.innerText = newRoomName;

// 	console.log("New room created:", newRoomName);
// }