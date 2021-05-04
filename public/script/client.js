// window.addEventListener("load", () => {
//     console.log("event");
// });

const shatForm = document.getElementById("message-form");
const shatContainer = document.querySelector(".chat");

const socket = io();

// Recieved messages from the server for render
socket.on("shatMessage", (message) => {
  console.log(message);
  renderMessage(message);

  // scroll down upon writing messages
  window.scrollTo(0, document.body.scrollHeight);
});

shatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const shatMsg = e.target.elements.message.value;

  // Send message to be read by the server
  socket.emit("shatMessage", shatMsg);
  console.log(shatMsg);
});

// Rendering messages from the server as content on the chat
function renderMessage(message) {
  console.log("render message");
  const div = document.createElement("div");
  div.classList.add("user-message");
  div.innerHTML = `<div class="message-header">
    <h5>Bosse</h5>
    <p class="time">13:46</p>
    </div>
    <p class="message-body">
    ${message}
    </p>`;
  document.querySelector(".chat").appendChild(div);
}
