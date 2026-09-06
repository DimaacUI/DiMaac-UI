import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include template zips + source in the serverless bundle for download/preview APIs.
  outputFileTracingIncludes: {
    '/api/templates/download': ['./private/templates/**/*.zip'],
    '/api/templates/preview': ['./private/templates/**/*'],
    // Poster frames mark which previews have quality encodes (src/lib/previewVideo.ts).
    '/templates/[slug]': ['./public/previews/*-poster.jpg'],
    // The admin import pushes repo-shipped zips to Blob storage.
    '/admin/templates': ['./private/templates/*.zip'],
  },
  images: {
    remotePatterns: [
      {
        // Thumbnails uploaded through the admin portal.
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**'
      },
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
