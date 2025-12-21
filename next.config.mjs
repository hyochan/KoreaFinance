/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "letsenhance.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
      },
      {
        protocol: "https",
        hostname: "*.convex.site",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;
