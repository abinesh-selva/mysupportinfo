import { useState, useEffect } from "react";
import { DeviceInfo, getDeviceInfo } from "@/lib/device-detection";

export function useDeviceInfo() {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function fetchInfo() {
            try {
                const info = await getDeviceInfo();
                if (mounted) {
                    setDeviceInfo(info);
                    setLoading(false);
                }
            } catch (e) {
                console.error("Failed to load device info", e);
                if (mounted) setLoading(false);
            }
        }

        fetchInfo();

        return () => {
            mounted = false;
        };
    }, []);

    return { deviceInfo, loading };
}
