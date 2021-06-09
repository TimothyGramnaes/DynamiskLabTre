const createRoomBtn = document.getElementById("create-room-btn");
const newRoomNameInput = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
const statusText = document.getElementById('status-text')
const newRoomPassword = document.getElementById('roomPassword')
let optionValuesArray = []
let createRoom = Boolean;
let isPrivate = Boolean;


createRoomBtn.addEventListener("click", () => {

	// Create an array of the option elements "value" attributes
	optionValuesArray = Array.from(roomDropdown.options)

	if (newRoomPassword.value.length != 0) {
		isPrivate = true
	} else {
		isPrivate = false
	}

	// Loop through array to check for duplicates
	optionValuesArray.every(function (optionElement) {
		let optionValue = optionElement.value

		// Check if <option value="___"> is same as newRoom.value
		if (optionValue === newRoomNameInput.value) {
			console.log('The room name', optionValue, 'already exists')
			statusText.innerText = `A room called ${optionValue} already exists`
			statusText.style.color = 'rgba(107, 0, 0, 1)'
			createRoom = false
			return false // to break the loop
		} else {
			console.log('Option value:', optionValue)
			statusText.innerText = `The room ${newRoomNameInput.value} was added to list`
			statusText.style.color = 'rgba(26, 255, 121, 1)'
			createRoom = true // to create room
			return true
		}
	})

	if (createRoom) {
		const newRoomName = newRoomNameInput.value;

		const optionElement = document.createElement("option");
		roomDropdown.appendChild(optionElement);

		if (isPrivate) {
			optionElement.setAttribute("value", newRoomName + ' - Privat');
			optionElement.innerText = newRoomName + ' - Privat';
		} else {
			optionElement.setAttribute("value", newRoomName);
			optionElement.innerText = newRoomName;
		}

		console.log("New room created:", newRoomName);
	}
});