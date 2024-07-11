import { useState, useEffect } from "react";
import {
  onDisconnect,
  onValue,
  ref,
  set,
} from "firebase/database";
import { db } from "src/firebase";

export const useFirebaseData = (deviceId: string | null) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    onValue(ref(db, "/connection/"), (snapshot) => {
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        setData([]);
      }
    });
  }, []);

  useEffect(() => {
    if (!deviceId) return;

    const connectionRef = ref(db, "/connection/" + deviceId);
    set(connectionRef, {
      id: deviceId,
      position: { x: 0, y: 0 },
      value: "",
    });

    // Handle disconnect
    onDisconnect(connectionRef).remove();

    return () => {
      onDisconnect(connectionRef).cancel();
    };
  }, [deviceId]);

  const updatePosition = (position: { x: number; y: number }) => {
    if (!deviceId) return;
    set(ref(db, "/connection/" + deviceId + "/position"), position);
  };

  const updateValue = (value: string) => {
    if (!deviceId) return;
    set(ref(db, "/connection/" + deviceId + "/value"), value);
  };

  return { data, updatePosition, updateValue };
};
