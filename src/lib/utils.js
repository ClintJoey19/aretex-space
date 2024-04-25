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

export const formatBytes = (bytes, decimals = 2) => {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  let size = bytes;
  let i = 0;

  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }

  return `${size.toFixed(decimals)} ${units[i]}`;
};

const mimeTypes = {
  txt: "text/plain",
  pdf: "application/pdf",
  doc: "application/vnd.google-apps.document",
  docx: "application/vnd.google-apps.document",
  xls: "application/vnd.google-apps.spreadsheet",
  xlsx: "application/vnd.google-apps.spreadsheet",
  csv: "application/vnd.google-apps.spreadsheet",
  ppt: "application/vnd.google-apps.presentation",
  pptx: "application/vnd.google-apps.presentation",
  file: "application/vnd.google-apps.file",
  folder: "application/vnd.google-apps.folder",
  gform: "application/vnd.google-apps.form",
  jpg: "application/vnd.google-apps.photo",
  jpeg: "application/vnd.google-apps.photo",
  png: "application/vnd.google-apps.photo",
  webp: "application/vnd.google-apps.photo",
  svg: "application/vnd.google-apps.photo",
  gif: "application/vnd.google-apps.photo",
  psd: "application/vnd.google-apps.photo",
  mp3: "application/vnd.google-apps.audio",
  aac: "application/vnd.google-apps.audio",
  wav: "application/vnd.google-apps.audio",
  m4a: "application/vnd.google-apps.audio",
  mp4: "application/vnd.google-apps.video",
  mov: "application/vnd.google-apps.video",
  avi: "application/vnd.google-apps.video",
  unknown: "application/vnd.google-apps.unknown",
};

// working
export const getMimeType = (fileExtension) => {
  return mimeTypes[fileExtension] || mimeTypes.unknown;
};
