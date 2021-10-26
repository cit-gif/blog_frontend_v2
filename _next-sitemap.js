const { httpUrl } = require('./src/config/index.js');
module.exports = {
	siteUrl: httpUrl,
	// changefreq: 'daily',
	// priority: 0.7,
	// sitemapSize: 5000,
	generateRobotsTxt: true,
	// Default transformation function
	transform: async (config, path) => {
		return {
			// loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
			// changefreq: config.changefreq,
			// priority: config.priority,
			// lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
			// alternateRefs: config.alternateRefs ?? [],
		};
	},
	// additionalPaths: async config => [await config.transform(config, '/additional-page')],
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', disallow: ['/graphql', '/admin', '/cong-cu'] },
			// { userAgent: '*', disallow: '/admin' },
			{
				userAgent: '*',
				allow: '/',
			},
		],
		additionalSitemaps: [
			// `${httpUrl}/sitemap.xml`,

			`${httpUrl}/server-sitemap.xml`,
		],
	},
	exclude: ['/secret'],
};
