/**
 * @param {import('next').NextConfig} nextConfig
 */
const componentPropsPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      config.plugins.push(
        new options.webpack.DefinePlugin({
          'process.env.IS_SERVER': JSON.stringify(options.isServer.toString()),
        })
      );

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

module.exports = componentPropsPlugin;
