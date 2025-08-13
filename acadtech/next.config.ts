import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'www.vectorstock.com',
      //   port: '',
      //   pathname: '/royalty-free-vector/*',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'www.vecteezy.com',
      //   port: '',
      //   pathname: '/vector-art/*',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'www.dreamstime.com',
      //   port: '',
      //   pathname: '/*',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'www.google.co.in',
      //   port: '',
      //   pathname: '/*',
      // },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/*',
      },
      // Add more patterns as needed
    ],
  },
};

export default nextConfig;
