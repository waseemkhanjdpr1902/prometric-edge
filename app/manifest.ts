import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prometric Edge",
    short_name: "Prometric Edge",
    description: "Healthcare licensing exam preparation for DHA, DOH and MOHAP.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f2",
    theme_color: "#071d19",
    icons: [],
  };
}
