const createRoomBtn = document.getElementById("create-room-btn");
const newRoom = document.getElementById("room-name");
const option = document.getElementsByTagName('option')
const statusText = document.getElementById('status-text')
let optionValuesArray = []
let createRoom = Boolean;


createRoomBtn.addEventListener("click", () => {

	// Create an array of the option elements "value" attributes
	optionValuesArray = Array.from(roomDropdown.options)
	
	// Loop through array to check for
	optionValuesArray.every(function (optionElement) {
		let optionValue = optionElement.value
		
		if (optionValue === newRoom.value) {
			console.log('The room name', optionValue, 'already exists')
			statusText.innerText = `A room called ${optionValue} already exists`
			statusText.style.color = 'red'
			createRoom = false
			return false
		} else {
			console.log('Option value:', optionValue)
			statusText.innerText = `The room ${newRoom.value} was added to list`
			statusText.style.color = 'green'
			createRoom = true
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