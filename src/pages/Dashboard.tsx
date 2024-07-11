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
    <div className="h-screen overflow-hidden relative bg-neutral-100">
      {deviceId &&
        data?.map((user: any, index: number) => (
          <TextArea
            key={index}
            label={user.id}
            value={user?.value || ""}
            position={user.position || { x: 0, y: 0 }}
            onChange={(value) => updateValue(value)}
          />
        ))}
    </div>
  );
};

export default Dashboard;
