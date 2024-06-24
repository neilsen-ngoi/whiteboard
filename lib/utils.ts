import { Camera } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2", "#D94", "#A45", "#D45", "#045", "#885", "#545"];

//Simple function to randomize border color based on connectionId
export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
//function needed to determie cursor location on canvas
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
