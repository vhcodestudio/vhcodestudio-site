import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "vhcodestudio", short_name: "vhcodestudio", start_url: "/", display: "standalone", background_color: "#0b0b0c", theme_color: "#0b0b0c", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] };
}
