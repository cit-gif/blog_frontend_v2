// /** @type {import('next').NextConfig} */
// const withAntdLess = require('next-plugin-antd-less');
// const { hostApi } = require('./src/config/constrant.d.ts');

// module.exports = withAntdLess({
// 	images: {
// 		domains: ['didongthongminh.vn', 'http://localhost:3001', hostApi, 'bizweb.dktcdn.net'],
// 	},
// 	// optional
// 	modifyVars: { '@primary-color': '#00bcd4' },
// 	// optional
// 	// lessVarsFilePath: './src/assets/antd-custom.less',
// 	// // optional
// 	lessVarsFilePathAppendToEndOfContent: false,
// 	reactStrictMode: true,
// 	eslint: {
// 		dirs: ['pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
// 	},
// });

/** @type {import('next').NextConfig} */
// require('dotenv').config();
const { hostApi, serverApi } = require('./src/config/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
module.exports = {
	poweredByHeader: false,

	async rewrites() {
		return {
			afterFiles: [
				{
					source: '/uploads/:uploads*',
					destination: `${serverApi}/uploads/:uploads*`,
				},
				{
					source: '/graphql',
					destination: `${serverApi}/graphql`,
				},

				// {
				// 	source: '/:admin*',
				// 	destination: `${serverApi}/:admin*`,
				// },
			],
			fallback: [
				{
					source: '/admin/:path*',
					destination: `${serverApi}/admin/:path*`,
				},
				{
					source: '/content-manager/:path*',
					destination: `${serverApi}/content-manager/:path*`,
				},
				{
					source: '/i18n/:locales*',
					destination: `${serverApi}/i18n/:locales*`,
				},
				{
					source: '/admin',
					destination: `${serverApi}/admin`,
				},
				// {
				// 	source: '/admin()',content-manager/content-types
				// 	destination: `${serverApi}/:slug*`,
				// },
				// {
				// 	// source: '/(\\admin)',
				// 	source: '/admin(/)',
				// 	destination: `${serverApi}/admin/`,
				// },
			],
		};
	},
	images: {
		domains: [hostApi],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	// optional
	reactStrictMode: true,
	eslint: {
		dirs: ['pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
	webpack(config) {
		// cho tailwindcss
		config.module.rules.push({
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
		});

		// cho rsuilt react
		config.module.rules.push({
			test: /\.(le)ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
				},

				{
					loader: 'less-loader',
					options: {
						sourceMap: true,
						lessOptions: {
							javascriptEnabled: true,
							// modifyVars: { '@enable-css-reset': false },
						},
					},
				},
			],
		});

		config.plugins.push(
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].css',
				chunkFilename: 'static/css/[contenthash].css',
			})
		);

		return config;
	},
};
/**
 * pwa
 */
// module.exports = withPWA({
// 	pwa: {
// 		dest: 'public',
// 		runtimeCaching,
// 	},
// 	async rewrites() {
// 		return [
// 			{
// 				source: '/uploads/:uploads*',
// 				destination: `${serverApi}/uploads/:uploads*`,
// 			},
// 			{
// 				source: '/graphql',
// 				destination: `${serverApi}/graphql`,
// 			},
// 		];
// 	},
// 	images: {
// 		domains: [hostApi],
// 		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
// 		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
// 	},
// 	// optional
// 	// reactStrictMode: true,
// 	eslint: {
// 		dirs: ['pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
// 	},
// 	webpack(config) {
// 		// cho tailwindcss
// 		config.module.rules.push({
// 			test: /\.css$/,
// 			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
// 		});

// 		// cho rsuilt react
// 		config.module.rules.push({
// 			test: /\.(le)ss$/,
// 			use: [
// 				MiniCssExtractPlugin.loader,
// 				{
// 					loader: 'css-loader',
// 				},

// 				{
// 					loader: 'less-loader',
// 					options: {
// 						sourceMap: true,
// 						lessOptions: {
// 							javascriptEnabled: true,
// 							// modifyVars: { '@enable-css-reset': false },
// 						},
// 					},
// 				},
// 			],
// 		});

// 		config.plugins.push(
// 			new MiniCssExtractPlugin({
// 				filename: 'static/css/[name].css',
// 				chunkFilename: 'static/css/[contenthash].css',
// 			})
// 		);

// 		return config;
// 	},
// });
