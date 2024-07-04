/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  async headers() {
    return [
      {
        // CORS 설정을 적용할 경로 (모든 경로에 적용)
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // 필요한 경우 특정 도메인으로 변경
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,HEAD,OPTIONS,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          },
        ],
      },
    ]
  },
}

export default nextConfig
