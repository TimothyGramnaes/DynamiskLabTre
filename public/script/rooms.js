const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
const statusText = document.getElementById('status-text')
let optionValuesArray = []
let createRoom = Boolean;


createRoomBtn.addEventListener("click", () => {

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
			createRoom = false
			return false // to break the loop
		} else {
			console.log('Option value:', optionValue)
			statusText.innerText = `The room ${newRoom.value} was added to list`
			statusText.style.color = 'rgba(26, 255, 121, 1)'
			createRoom = true // to create room
			return true
		}
	})

	if (createRoom) {
		const newRoomName = newRoom.value;

		const optionElement = document.createElement("option");
		roomDropdown.appendChild(optionElement);
		optionElement.setAttribute("value", newRoomName);
		optionElement.innerText = newRoomName;

		console.log("New room created:", newRoomName);
	}
});