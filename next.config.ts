import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include template zips + source in the serverless bundle for download/preview APIs.
  outputFileTracingIncludes: {
    '/api/templates/download': ['./private/templates/**/*.zip'],
    '/api/templates/preview': ['./private/templates/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**'
      },
      {
        protocol: 'https', 
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https', 
        hostname: 'plus.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https', 
        hostname: 'images.pexels.com',
        pathname: '/**'
      },
      {
        protocol: 'https', 
        hostname: 'i.pinimg.com',
        pathname: '/**'
      },
    ]
  }
};

export default nextConfig;
