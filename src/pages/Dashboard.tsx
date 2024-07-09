import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "src/firebase";
import { useMouse } from "@uidotdev/usehooks";

function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [mouse] = useMouse();
  const [id, setId] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    set(ref(db, "/connection/" + id + "/position"), {
      x: mouse.x,
      y: mouse.y,
    });
  }, [mouse, id]);

  useEffect(() => {
    onValue(ref(db, "/connection/"), (snapshot) => {
      if (snapshot.exists()) {
        setData(Object.values(snapshot.exportVal()));
      } else {
        setData([]);
      }
    });
  }, []);

  useEffect(() => {
    onDisconnect(ref(db, "/connection/" + id)).remove();
  }, [id]);

  const handleConnectionSelect = (userId: number) => {
    setId(userId);
    set(ref(db, `/connection/${userId}`), { id: userId });
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {!!id &&
        data?.map((item: any, index: number) => (
          <input
            key={index}
            autoFocus
            className="px-2 py-1 w-64 bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
            style={{ left: item.position?.x, top: item.position?.y }}
            value={item?.value}
            onChange={(e) => {
              set(ref(db, "/connection/" + id + "/value"), e.target.value);
            }}
          />
        ))}

      {!id && data !== null && (
        <div className="flex justify-center items-center h-full gap-8">
          {[1, 2].map(
            (id) =>
              data.every((item: any) => item.id !== id) && (
                <button
                  key={id}
                  className="w-36 h-32 text-4xl bg-slate-200 rounded-md hover:bg-slate-300 transition-all"
                  onClick={() => handleConnectionSelect(id)}
                >
                  {id}
                </button>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
