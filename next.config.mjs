/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
      images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',  
            },
            {
                protocol: 'https',
                hostname: '**.res.cloudinary.com',  
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',  
            },
            {
                protocol: 'https',
                hostname: '**.images.pexels.com',  
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',  
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',  
            },
            
        ],
    },
};
export default nextConfig;