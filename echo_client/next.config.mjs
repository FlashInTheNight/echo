/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  domains: ['host.docker.internal'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "host.docker.internal",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  }
};


export default nextConfig;
