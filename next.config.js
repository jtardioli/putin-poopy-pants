module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'es', 'fr']
  },
  reactStrictMode: true,
  webpack: (config) => {
    // config.experiments = { topLevelAwait: true };
    // config.resolve.fallback = {
    //   assert: false,
    //   process: false,
    //   events: false,
    //   fs: false,
    //   util: false,
    //   path: false,
    //   stream: false,
    //   constants: false,
    //   os: false,
    // };
    return config
  }
}
