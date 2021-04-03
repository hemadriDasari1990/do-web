const io = require("socket.io-client");

const token = sessionStorage.getItem("token");
// const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
//   reconnect: true,
// });
const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  query: {
    token,
  },
  // forceNew: true,
  //   transports: ["websocket"],
});

socket.on("connect", () => console.log("connected", 123));
socket.on("disconnect", () => {
  //   socket.reconnect();
});

socket.on("unauthorised", () => {
  socket.disconnect();
});

socket.on("error", console.error);
socket.on("connect_error", console.error);

export default socket;
