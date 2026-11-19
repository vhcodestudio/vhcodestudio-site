import "../globals.css";
import type { Viewport } from "next";
import { Shell, metadataFor } from "@/components/shell";

export const metadata = metadataFor("en");
export const viewport: Viewport = { themeColor: "#0b0b0c" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
