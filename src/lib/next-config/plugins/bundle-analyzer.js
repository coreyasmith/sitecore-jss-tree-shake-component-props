const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false
});

/**
 * @param {import('next').NextConfig} nextConfig
 */
const bundleAnalyzer = (nextConfig = {}) => {
  return withBundleAnalyzer(nextConfig);
};

module.exports = bundleAnalyzer;
