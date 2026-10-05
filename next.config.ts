import type { NextConfig } from "next";

// cursos.miguelliebana.com is the same Vercel project: its home shows the course catalog (/cursos) and every other
// page path goes to vibecoding.miguelliebana.com, so each page has a single address. Files and the API stay on the
// host that asked for them (the catalog's own CSS, JS, images and the assistant).
const coursesHost = [{ type: "host" as const, value: "cursos.miguelliebana.com" }];

const nextConfig: NextConfig = {
  async rewrites() {
    return { beforeFiles: [{ source: "/", has: coursesHost, destination: "/cursos" }], afterFiles: [], fallback: [] };
  },
  async redirects() {
    return [
      {
        source: "/:path((?!_next/|api/)[^.]+)",
        has: coursesHost,
        destination: "https://vibecoding.miguelliebana.com/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
