const io = require("socket.io-client");

const socket = io.connect();

socket.on('connect', () => console.log('connected'))
socket.on('error', console.error)
socket.on('connect_error', console.error)

export default socket;