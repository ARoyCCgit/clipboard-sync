import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Smartphone,
  Monitor,
  Copy,
  CheckCircle,
  Wifi,
  WifiOff
} from "lucide-react";

dayjs.extend(relativeTime);

const socket = io("http://172.20.10.2:3001", {
  transports: ["websocket"],
  autoConnect: false
});

function App() {

  const { sessionId } = useParams();

  const [clipboard, setClipboard] = useState("");
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    socket.connect();

    socket.on("connect", () => {

      console.log(
        "PHONE CONNECTED:",
        socket.id
      );

      setConnected(true);

      socket.emit("join-session", {
        sessionId,
        deviceName: "Arnab Phone",
        deviceType: "mobile"
      });

    });

    socket.on("disconnect", () => {

      console.log("PHONE DISCONNECTED");

      setConnected(false);

    });

    socket.on("clipboard-update", (data) => {

      console.log(
        "PHONE RECEIVED:",
        data
      );

      setClipboard(data.text);

      setHistory((prev) => [

        {
          text: data.text,
          createdAt: new Date()
        },

        ...prev

      ]);

      toast.success("Clipboard Synced");

    });

    return () => {

      socket.disconnect();

    };

  }, [sessionId]);

  const copyClipboard = async (text) => {

    try {

      const textArea = document.createElement("textarea");

      textArea.value = text;

      document.body.appendChild(textArea);

      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(textArea);

      toast.success("Copied To Phone Clipboard");

    } catch (error) {

      toast.error("Copy Failed");

    }

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-4">

      <Toaster position="top-center" />

      <div className="max-w-2xl mx-auto">

        <div className="bg-slate-800 rounded-2xl p-5 shadow-xl mb-5">

          <div className="flex items-center justify-between mb-4">

            <div className="flex items-center gap-3">

              <Smartphone size={28} />

              <div>
                <h1 className="text-2xl font-bold">
                  Clipboard Sync
                </h1>

                <p className="text-slate-400 text-sm">
                  Realtime Cross Device Sync
                </p>
              </div>

            </div>

            <div>
              {
                connected ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <Wifi size={20} />
                    Connected
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-400">
                    <WifiOff size={20} />
                    Offline
                  </div>
                )
              }
            </div>

          </div>

          <div className="bg-slate-700 rounded-xl p-4 break-words">

            <div className="flex items-center justify-between mb-2">

              <div className="flex items-center gap-2">
                <Monitor size={18} />
                Latest Clipboard
              </div>

              <button
                onClick={() => copyClipboard(clipboard)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Copy size={18} />
                Copy
              </button>

            </div>

            <div className="text-slate-200 whitespace-pre-wrap">
              {clipboard || "Waiting for clipboard..."}
            </div>

          </div>

        </div>

        <div className="bg-slate-800 rounded-2xl p-5 shadow-xl">

          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-400" />
            Clipboard History
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">

            {
              history.map((item, index) => (

                <div
                  key={index}
                  className="bg-slate-700 rounded-xl p-4"
                >

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-xs text-slate-400">
                      {dayjs(item.createdAt).fromNow()}
                    </span>

                    <button
                      onClick={() => copyClipboard(item.text)}
                      className="text-blue-400 text-sm"
                    >
                      Copy
                    </button>

                  </div>

                  <div className="text-sm whitespace-pre-wrap break-words">
                    {item.text}
                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;