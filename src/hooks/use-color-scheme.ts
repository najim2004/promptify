import { useColorScheme as useDeviceColorScheme } from "react-native";
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

let currentThemeMode: ThemeMode = "light";
const listeners = new Set<() => void>();

export function getThemeMode(): ThemeMode {
  return currentThemeMode;
}

export function setThemeMode(mode: ThemeMode) {
  currentThemeMode = mode;
  listeners.forEach((l) => l());
}

export function useColorScheme() {
  const deviceScheme = useDeviceColorScheme() || "light";
  const [, setTick] = useState(0);

  useEffect(() => {
    const forceUpdate = () => setTick((t) => t + 1);
    listeners.add(forceUpdate);
    return () => {
      listeners.delete(forceUpdate);
    };
  }, []);

  if (currentThemeMode === "system") {
    return deviceScheme === "dark" ? "dark" : "light";
  }
  return currentThemeMode;
}
