const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },
    outputFileTracingRoot: path.join(__dirname, './'),
}

module.exports = nextConfig
