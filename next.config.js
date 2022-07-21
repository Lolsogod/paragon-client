/** @type {import('next').NextConfig} */
const nextConfig = {


}
module.exports = {
  reactStrictMode: false,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/cars/:path*',
        destination: 'http://localhost:8080/cars/:path*'
      },
      {
        source: '/api/account/:path*',
        destination: 'http://localhost:8081/account/:path*'
      },
      {
        source: '/api/orders/:path*',
        destination: 'http://localhost:8082/orders/:path*'
      },
      {
        source: '/api/parts/:path*',
        destination: 'http://localhost:8083/parts/:path*'
      },
      {
        source: '/api/works/:path*',
        destination: 'http://localhost:8083/works/:path*'
      }
    ]
  }
}

