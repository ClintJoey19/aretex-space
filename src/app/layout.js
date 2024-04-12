import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aretex Space",
  description: "Ditch the limitations of traditional cloud storage! Aretex Space offers powerful shared drive features: bulk member invites, effortless shared drive creation, and pre-populated Drive templates to jumpstart collaboration.  Take control and streamline your teamwork.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
