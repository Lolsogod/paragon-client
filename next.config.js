/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false
}
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/cars/:path*',
        destination: 'http://localhost:8080/cars/:path*',
      },
    ]
  },
}

