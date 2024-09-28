import React, { useEffect, useState } from "react";

import { IDevice, demoDevices } from "src/utils/interfaces/auth/IMFA";

type DeviceAuthError = {
  response?: {
    status: number;
    data: {
      details: { target: string; message: string; code: string }[];
    };
  };
};

export default function useFetchDevices() {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [error, setError] = useState<DeviceAuthError>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchDevices = () => {
    setTimeout(() => {
      setDevices(demoDevices);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => fetchDevices(), []);

  return {
    devices,
    setDevices,
    isLoading,
    error,
  };
}
