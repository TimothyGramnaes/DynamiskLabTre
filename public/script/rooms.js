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

			const newRoomName = newRoom.value;
			const optionElement = document.createElement("option");
			roomDropdown.appendChild(optionElement);
			optionElement.setAttribute("value", newRoomName + ' - Privat');
			optionElement.innerText = newRoomName + ' - Privat';
		
		} else {
			// room object without psw

			const newRoomName = newRoom.value;
			const optionElement = document.createElement("option");
			roomDropdown.appendChild(optionElement);
			optionElement.setAttribute("value", newRoomName);
			optionElement.innerText = newRoomName;
		
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
			statusText.innerText = `A room called ${optionValue} already exists`
			statusText.style.color = 'rgba(107, 0, 0, 1)'
			isUnique = false
			return false // to break the loop
		} else {
			statusText.innerText = `The room ${newRoom.value} was added to list`
			statusText.style.color = 'rgba(26, 255, 121, 1)'
			isUnique = true // to create room
			return true
		}
	})
}