/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/p/:path*',
                destination: '/protected/:path*'
            }
        ]
    }
};

export default nextConfig;
