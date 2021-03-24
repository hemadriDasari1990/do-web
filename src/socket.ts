const io = require("socket.io-client");

// const token = sessionStorage.getItem("token");
// const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
//   reconnect: true,
// });

const socket = io.connect();

socket.on("connect", () => console.log("connected"));
socket.on("error", console.error);
socket.on("connect_error", console.error);

export default socket;
