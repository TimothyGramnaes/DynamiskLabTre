const createRoomBtn = document.getElementById('create-room-btn')
const roomDropdown = document.getElementById('chat-room')
const newRoom = document.getElementById('room-name')

createRoomBtn.addEventListener('click', () => {
  const newRoomName = newRoom.value
  const optionElement = document.createElement('option')
  
  roomDropdown.appendChild(optionElement)
  optionElement.setAttribute('value', newRoomName)
  optionElement.innerText = newRoomName
  console.log('New room created')
})