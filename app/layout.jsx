import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const host_Grotesk = Host_Grotesk({
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
      className={host_Grotesk.classname}
      >
        <Provider >
        {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
