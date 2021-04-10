const io = require("socket.io-client");

const token = sessionStorage.getItem("token");

const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  query: {
    token,
  },
  reconnection: false,
  // forceNew: true,
  //   transports: ["websocket"],
});

socket.on("connect", () => console.log("connected"));
socket.on("disconnect", () => {
  socket.connect();
});

const tryReconnect = () => {
  setTimeout(() => {
    socket.io.open((err: any) => {
      if (err) {
        tryReconnect();
      }
    });
  }, 2000);
};

socket.io.on("close", tryReconnect);

socket.on("unauthorised", () => {
  // socket.disconnect();
});

socket.on("error", console.error);
socket.on("connect_error", console.error);

export default socket;
