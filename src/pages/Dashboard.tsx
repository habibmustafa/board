import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "src/firebase";
import { useMouse } from "@uidotdev/usehooks";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [mouse] = useMouse();
  const [id, setId] = useState<any>(null);

  async function getDeviceId() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  }

  useEffect(() => {
    getDeviceId().then((deviceId) => {
      setId(deviceId);
      console.log("Device ID:", deviceId);
    });

    onValue(ref(db, "/connection/"), (snapshot) => {
      if (snapshot.exists()) {
        setData(Object.values(snapshot.exportVal()));
      } else {
        setData([]);
      }
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    set(ref(db, "/connection/" + id + "/position"), {
      x: mouse.x,
      y: mouse.y,
    });
  }, [mouse, id]);

  useEffect(() => {
    if (!!id) onDisconnect(ref(db, "/connection/" + id)).remove();
  }, [id]);

  return (
    <div className="h-screen overflow-hidden relative">
      {!!id &&
        data?.map((item: any, index: number) => (
          <input
            key={index}
            autoFocus
            className="px-2 py-1 w-64 bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
            style={{ left: item.position?.x, top: item.position?.y }}
            value={item?.value || ""}
            onChange={(e) => {
              set(ref(db, "/connection/" + id + "/value"), e.target.value);
            }}
          />
        ))}
    </div>
  );
}

export default Dashboard;
