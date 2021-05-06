const createRoomBtn = document.getElementById("create-room-btn");
const roomDropdown = document.getElementById("chat-room");
const newRoom = document.getElementById("room-name");
const fs = require("fs");

createRoomBtn.addEventListener("click", () => {
  const newRoomName = newRoom.value;
  const optionElement = document.createElement("option");

  roomDropdown.appendChild(optionElement);
  optionElement.setAttribute("value", newRoomName);
  optionElement.innerText = newRoomName;
  console.log("New room created");

  const roomy = {
    name: "Berget",
    password: "qwerty",
  };

  const jsonString = JSON.stringify(roomy);

  fs.writeFile("../../data.json", jsonString, "utf8");
});
