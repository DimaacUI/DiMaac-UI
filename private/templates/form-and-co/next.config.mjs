/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Pexels-hosted imagery through next/image (we mostly use plain <img>,
    // but this keeps the door open for next/image usage).
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
