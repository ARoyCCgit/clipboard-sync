process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED ERROR:", error);
});

const clipboardyModule = require("clipboardy");
const clipboard =
  clipboardyModule.default || clipboardyModule;

const io = require("socket.io-client");
const QRCode = require("qrcode");
const os = require("os");

const socket = io("http://localhost:3001");

let previousText = "";
let sessionId = "";

function getLocalIpAddress() {

  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {

    for (const net of interfaces[name]) {

      if (
        net.family === "IPv4" &&
        !net.internal
      ) {

        return net.address;

      }

    }

  }

  return "localhost";

}

socket.on("connect", () => {

  console.log("Connected To Server");

  socket.emit("create-session");

});

socket.on("session-created", async (id) => {

  try {

    sessionId = id;

    console.log("SESSION CREATED:", sessionId);

    const ip = getLocalIpAddress();

    const url =
      `http://${ip}:5173/connect/${sessionId}`;

    console.log("Generated URL:", url);

    const qr =
      await QRCode.toDataURL(url);

    document.getElementById("qr").innerHTML = `
      <img src="${qr}" width="250" />
    `;

  } catch (error) {

    console.log("QR ERROR:", error);

  }

});

async function checkClipboard() {

  try {

    if (!sessionId) {
      return;
    }

    console.log("Checking clipboard...");

    if (!clipboard.read) {

      console.log(
        "clipboard.read not available"
      );

      return;

    }

    const currentText =
      await clipboard.read();

    console.log(
      "Current Clipboard:",
      currentText
    );

    if (
      currentText &&
      currentText !== previousText
    ) {

      previousText = currentText;

      console.log(
        "Sending Clipboard:",
        currentText
      );

      document.getElementById(
        "clipboard"
      ).innerText = currentText;

      socket.emit("clipboard-change", {
        sessionId,
        text: currentText
      });

    }

  } catch (error) {

    console.log(
      "CLIPBOARD ERROR:",
      error
    );

  }

}

setInterval(checkClipboard, 1500);