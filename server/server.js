const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const sessions = {};

io.on("connection", (socket) => {

  console.log("New Device Connected");

  socket.on("create-session", () => {

    const sessionId = uuidv4();

    sessions[sessionId] = {
      history: [],
      devices: []
    };

    socket.join(sessionId);

    socket.emit("session-created", sessionId);

  });

  socket.on("join-session", (data) => {

    const {
      sessionId,
      deviceName,
      deviceType
    } = data;

    if (!sessions[sessionId]) {
      return;
    }

    sessions[sessionId].devices.push({
      deviceName,
      deviceType
    });

    socket.join(sessionId);

    socket.emit("history", sessions[sessionId].history);

    console.log(`${deviceName} connected`);

  });

  socket.on("clipboard-change", (data) => {

    const {
      sessionId,
      text
    } = data;

    if (!sessions[sessionId]) {
      return;
    }

    const clipboardData = {
      text,
      createdAt: new Date()
    };

    sessions[sessionId].history.unshift(
      clipboardData
    );

    sessions[sessionId].history =
      sessions[sessionId].history.slice(0, 50);

    console.log(
      "Broadcasting To Room:",
      sessionId
    );

    io.to(sessionId).emit(
      "clipboard-update",
      clipboardData
    );

  });

});

server.listen(3001, () => {
  console.log("Server Running On Port 3001");
});