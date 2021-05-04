// window.addEventListener("load", () => {
//     console.log("event");
// });

const shatForm = document.getElementById("message-form");

const socket = io();

// Recieved messages from the server for render
socket.on("message", (message) => {
    console.log(message);
    renderMessage(message);
});

shatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const shatMsg = e.target.elements.message.value;

    // Send message to be read by the server
    socket.emit("message", shatMsg);
    console.log(shatMsg);
});

function renderMessage(message) {
    console.log('render message')
    const div = document.createElement("div");
    div.classList.add("user-message");
    div.innerHTML = `<div class="message-header">
    <h5>Bosse</h5>
    <p class="time">13:46</p>
    </div>
    <p class="message-body">
    ${message}hejhejhejhejhe
    </p>`;
    document.querySelector('.chat').appendChild(div);
}
