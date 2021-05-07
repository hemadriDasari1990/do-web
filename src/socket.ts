const io = require("socket.io-client");

export const initiateSocketConnection = () => {
  const token = localStorage.getItem("token");
  const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
    query: {
      token,
    },
    reconnection: false,
    // forceNew: true,
    //   transports: ["websocket"],
  });
  const tryReconnect = () => {
    setTimeout(() => {
      socket.io.open((err: any) => {
        if (err) {
          tryReconnect();
        }
      });
    }, 5000);
  };
  socket.on("connect", () => console.log("connected"));
  // socket.on("disconnect", () => {
  //   socket.connect();
  // });

  socket.io.on("close", tryReconnect);

  socket.on("unauthorised", () => {
    // socket.disconnect();
  });

  socket.on("error", console.error);
  socket.on("connect_error", console.error);
  return socket;
};

// export default socket;
