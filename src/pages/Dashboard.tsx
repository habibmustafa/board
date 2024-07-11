// import { onDisconnect, onValue, ref, set } from "firebase/database";
// import { useEffect, useRef, useState } from "react";
// import { db } from "src/firebase";
// import { useMouse } from "@uidotdev/usehooks";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";

// function Dashboard() {
//   const [data, setData] = useState<any>(null);
//   const [mouse] = useMouse();
//   const [id, setId] = useState<any>(null);

//   const textArea = useRef<HTMLTextAreaElement>(null);

//   async function getDeviceId() {
//     const fp = await FingerprintJS.load();
//     const result = await fp.get();
//     return result.visitorId;
//   }

//   useEffect(() => {
//     getDeviceId().then((deviceId) => {
//       setId(deviceId);
//       console.log("Device ID:", deviceId);
//     });

//     onValue(ref(db, "/connection/"), (snapshot) => {
//       if (snapshot.exists()) {
//         setData(Object.values(snapshot.exportVal()));
//       } else {
//         setData([]);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (!id) return;
//     set(ref(db, "/connection/" + id + "/position"), {
//       x: mouse.x,
//       y: mouse.y,
//     });
//   }, [mouse, id]);

//   useEffect(() => {
//     if (!!id) onDisconnect(ref(db, "/connection/" + id)).remove();
//   }, [id]);

//   const textAreaResize = () => {
//     if (textArea.current) {
//       textArea.current.style.height = "auto";
//       textArea.current.style.height = textArea.current.scrollHeight + "px";
//     }
//   };

//   const left = (textArea.current?.clientWidth || 256) / 2;
//   const top = (textArea.current?.clientHeight || 32) / 2;

//   return (
//     <div className="h-screen overflow-hidden relative">
//       {!!id &&
//         data?.map((item: any, index: number) => (
//           <textarea
//             ref={textArea}
//             key={index}
//             autoFocus
//             rows={1}
//             className="px-2 py-1 w-64 resize-none bg-slate-700 rounded text-white absolute -translate-x-1/2 -translate-y-1/2 cursor-none"
//             style={{
//               left: `${Math.max(
//                 left,
//                 Math.min(window.innerWidth - left, item.position?.x)
//               )}px`,
//               top: `${Math.max(
//                 top,
//                 Math.min(window.innerHeight - top, item.position?.y)
//               )}px`,
//             }}
//             value={item?.value || ""}
//             onChange={(e) => {
//               set(ref(db, "/connection/" + id + "/value"), e.target.value);
//               textAreaResize();
//             }}
//           />
//         ))}
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";
import { useMouse } from "@uidotdev/usehooks";
import { useDeviceId } from "src/hooks/useDeviceId";
import { useFirebaseData } from "src/hooks/useFirebaseData";
import TextArea from "src/components/TextArea";

const Dashboard: React.FC = () => {
  const [mouse] = useMouse();
  const deviceId = useDeviceId();
  const { data, updatePosition, updateValue } = useFirebaseData(deviceId);

  React.useEffect(() => {
    if (deviceId) {
      updatePosition({ x: mouse.x, y: mouse.y });
    }
  }, [mouse, deviceId]);

  return (
    <div className="h-screen overflow-hidden relative">
      {deviceId &&
        data?.map((item: any, index: number) => (
          <TextArea
            key={index}
            value={item?.value || ""}
            position={item.position || { x: 0, y: 0 }}
            onChange={(value) => updateValue(value)}
          />
        ))}
    </div>
  );
};

export default Dashboard;
