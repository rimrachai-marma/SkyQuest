import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLayoverMinutes = (arr: string, dep: string): number => {
  return Math.floor(
    (new Date(dep).getTime() - new Date(arr).getTime()) / 60000
  );
};

export const formatTime = (iso: string) => format(new Date(iso), "HH:mm");
export const formatDate = (iso: string) => format(new Date(iso), "dd MMM");

export const formatDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match?.[1]?.replace("H", "") || "0";
  const minutes = match?.[2]?.replace("M", "") || "0";
  return `${hours !== "0" ? hours + "h " : ""}${
    minutes !== "0" ? minutes + "m" : ""
  }`;
};
