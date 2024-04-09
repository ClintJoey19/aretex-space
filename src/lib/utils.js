import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const removeSpaces = (value) => {
  let text = value.replace(/ /g, "")

  return text
}