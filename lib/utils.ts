import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2", "#D94", "#A45", "#D45", "#045", "#885", "#545"];

//Simple function to randomize border color based on connectionId
export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
