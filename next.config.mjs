/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'encrypted-tbn0.gstatic.com',
      'via.placeholder.com',
      'placehold.co'
    ]
  },
};

export default nextConfig;
