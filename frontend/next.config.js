/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.dicebear.com', 'yt3.googleusercontent.com'],
    },
    trailingSlash: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/index.py',
            },
        ]
    },
}

module.exports = nextConfig
