/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lumastack.ru',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/#*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/privacy-policy'),
  ],
};