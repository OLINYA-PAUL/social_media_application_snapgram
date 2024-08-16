import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateTime: string): string => {
  const date = new Date(dateTime);
  const now = new Date();
  const seconds = (now.getTime() - date.getTime()) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  switch (true) {
    case seconds < 60:
      return `created ${Math.floor(seconds)} seconds ago`;
    case minutes < 60:
      return `created ${Math.floor(minutes)} minutes ago`;
    case hours < 24:
      return `created ${Math.floor(hours)} hours ago`;
    default:
      return `created ${Math.floor(days)} days ago`;
  }
};
