/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "221.149.185.157",
        pathname: "/sejong-malsami/thumbnail/**",
      },
      {
        protocol: "http",
        hostname: "221.149.185.157",
        pathname: "/sejong-malsami/question/**",
      },
      {
        protocol: "http",
        hostname: "221.149.185.157",
        pathname: "/sejong-malsami/answer/**",
      },
      {
        protocol: "http",
        hostname: "suh-project.synology.me", // 새 호스트 추가
        pathname: "/sejong-malsami/thumbnail/**", // 이 경로의 이미지만 허용
      },
    ],
  },
};

export default nextConfig;
