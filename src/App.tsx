import {
  onDisconnect,
  onValue,
  ref,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { useMouse } from "@uidotdev/usehooks";

function App() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>({
    position: {
      x: 0,
      y: 0,
    },
    value: "",
  });
  const [mouse] = useMouse();

  useEffect(() => {
    if (!ip) return;
    set(ref(db, "/connection/" + ip + "/position"), {
      x: mouse.x,
      y: mouse.y,
    });
  }, [mouse, ip]);

  const getIp = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    setIp(data.ip.replace(/\./g, ""));
  };

  useEffect(() => {
    getIp();
  }, []);

  useEffect(() => {
    if (!ip) return;

    // Example code to get the client IP address using WebRTC
    const connection = ref(db, "/connection/" + ip);

    set(connection, {
      position: {
        x: 300,
        y: 300,
      },
      value: "",
    });

    onValue(connection, (snapshot) => {
      setData((prev: any) => ({
        ...prev,
        ...snapshot.val(),
      }));
    });
    onDisconnect(connection).remove();
  }, [ip]);

  return (
    <div className="h-screen overflow-hidden relative">
      <input
        className="px-2 py-1 bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
        style={{ left: data.position.x, top: data.position.y }}
        value={data.value}
        onChange={(e) => {
          set(ref(db, "/connection/" + ip + "/value"), e.target.value);
        }}
      />
    </div>
  );
}

export default App;
