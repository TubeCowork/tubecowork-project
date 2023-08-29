/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        esmExternals: "loose",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ytimg.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "yt3.ggpht.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
}

module.exports = nextConfig
