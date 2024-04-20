import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export const DOMAIN = "http://localhost:3000"; // local
export const DOMAIN = "https://aretex-space.vercel.app"; // vercel
// export const DOMAIN = "http://localhost:3000"; // amplify

export const removeSpaces = (value) => {
  let text = value.replace(/ /g, "");

  return text;
};

export const pauseForOneSecond = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
