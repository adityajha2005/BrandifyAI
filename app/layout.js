import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import provider from "./provider";


const host_Grotesk = Host_Grotesk({
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className={host_Grotesk.classname}
      >
        <provider>
        {children}
        </provider>
      </body>
    </html>
  );
}
