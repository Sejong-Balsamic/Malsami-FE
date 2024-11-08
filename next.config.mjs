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
    domains: ["sejong-malsami.s3.ap-northeast-2.amazonaws.com"], // 임시로 외부 사진url 접속혀용. 나중에 필요 시 삭제
  },
};

export default nextConfig;
