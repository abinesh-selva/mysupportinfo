import { UAParser } from "ua-parser-js";

export interface DeviceInfo {
    // Core
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
    deviceType: string; // mobile, tablet, desktop
    ip: string;
    userAgent: string;

    // Hardware
    screenResolution: string;
    windowSize: string;
    cpuCores: number | "Unknown";
    memory: number | "Unknown"; // in GB
    gpuRenderer: string;

    // Network
    connectionType: string;
    rtt: number | "Unknown";
    downlink: number | "Unknown";

    // Privacy & Settings
    cookiesEnabled: boolean;
    doNotTrack: "Enabled" | "Disabled" | "Unspecified";
    timezone: string;
    language: string;
    referrer: string;
}

// Extend Navigator interface for experimental properties
interface ExtendedNavigator extends Navigator {
    deviceMemory?: number;
    connection?: {
        effectiveType: string;
        rtt: number;
        downlink: number;
        saveData: boolean;
    };
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
    if (typeof window === "undefined") {
        return {
            osName: "Unknown",
            osVersion: "",
            browserName: "Unknown",
            browserVersion: "",
            deviceType: "Unknown",
            ip: "Unknown",
            userAgent: "",
            screenResolution: "Unknown",
            windowSize: "Unknown",
            cpuCores: "Unknown",
            memory: "Unknown",
            gpuRenderer: "Unknown",
            connectionType: "Unknown",
            rtt: "Unknown",
            downlink: "Unknown",
            cookiesEnabled: false,
            doNotTrack: "Unspecified",
            timezone: "Unknown",
            language: "Unknown",
            referrer: "None",
        };
    }

    const parser = new UAParser();
    const result = parser.getResult();
    const nav = navigator as ExtendedNavigator;

    // Graphics - WebGL Renderer
    let gpuRenderer = "Unknown";
    try {
        const canvas = document.createElement("canvas");
        const gl =
            canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
        if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            }
        }
    } catch (e) {
        console.warn("WebGL detection failed", e);
    }

    // IP Address (Privacy-friendly check)
    let ip = "Loading...";
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (res.ok) {
            const data = await res.json();
            ip = data.ip;
        } else {
            ip = "Unavailable";
        }
    } catch {
        ip = "Blocked/Offline";
    }

    // Do Not Track
    let dnt: "Enabled" | "Disabled" | "Unspecified" = "Unspecified";
    if (navigator.doNotTrack === "1") dnt = "Enabled";
    if (navigator.doNotTrack === "0") dnt = "Disabled";

    return {
        osName: result.os.name || "Unknown",
        osVersion: result.os.version || "",
        browserName: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "",
        deviceType: result.device.type || "Desktop",
        userAgent: navigator.userAgent,
        ip,

        screenResolution: `${window.screen.width} x ${window.screen.height}`,
        windowSize: `${window.innerWidth} x ${window.innerHeight}`,
        cpuCores: navigator.hardwareConcurrency || "Unknown",
        memory: nav.deviceMemory || "Unknown",
        gpuRenderer,

        connectionType: nav.connection?.effectiveType || "Unknown",
        rtt: nav.connection?.rtt || "Unknown",
        downlink: nav.connection?.downlink || "Unknown",

        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: dnt,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        referrer: document.referrer || "Direct",
    };
};
