import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "src/firebase";
import { useMouse } from "@uidotdev/usehooks";
import { useParams } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState<any>([]);
  const [mouse] = useMouse();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    set(ref(db, "/connection/" + id + "/position"), {
      x: mouse.x,
      y: mouse.y,
    });
  }, [mouse, id]);

  // const getConnections = async () => {
  //   get(ref(db, "/connection/")).then((snapshot) => {
  //     if (snapshot.size === 2) {
  //       setUser(0);
  //     } else {
  //       setUser(!!snapshot.hasChild("1") ? 2 : 1);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getConnections();
  // }, []);

  // useEffect(() => {
  //   if (!ip) return;

  //   // Example code to get the client IP address using WebRTC
  //   const connection = ref(db, "/connection/" + ip);

  //   set(connection, {
  //     position: {
  //       x: 300,
  //       y: 300,
  //     },
  //     value: "",
  //   });

  //   onValue(connection, (snapshot) => {
  //     setData((prev: any) => ({
  //       ...prev,
  //       ...snapshot.val(),
  //     }));
  //   });
  //   onDisconnect(connection).remove();
  // }, [ip]);

  useEffect(() => {
    onValue(ref(db, "/connection/"), (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
        console.log(snapshot.val());
      }
    });

    onDisconnect(ref(db, "/connection/" + id)).remove();
  }, []);

  return (
    <div className="h-screen overflow-hidden relative">
      {data.map((item: any, index: number) => (
        <input
          key={index}
          className="px-2 py-1 bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
          style={{ left: item.position.x, top: item.position.y }}
          value={item.value}
          onChange={(e) => {
            set(ref(db, "/connection/" + id + "/value"), e.target.value);
          }}
        />
      ))}
    </div>
  );
}

export default Dashboard;
