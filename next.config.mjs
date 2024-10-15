/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/abc-def-ghi/login",
        destination: "/api/admin/auth/signin",
      },
      {
        source: "/login",
        destination: "/api/auth/signin",
      },
    ];
  },
};
const nextConfig = {};

export default nextConfig;
