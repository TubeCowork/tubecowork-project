/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        esmExternals: "loose",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
}

module.exports = nextConfig
