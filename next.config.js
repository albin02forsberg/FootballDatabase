/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    distDir: "build",
    exportPathMap: async function(
        defaultPathMap, { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            "/": { page: "/" },
            "/about": { page: "/about" },
        };
    },
    images: {
        unoptimized: false,
    },
};

module.exports = nextConfig;