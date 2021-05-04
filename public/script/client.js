window.addEventListener('load', () => {
    console.log('event')
})

const socket = io();

socket.on('message', message => {
    console.log(message)
})
