import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Layout from '../src/layouts';
import { Provider } from 'react-redux';
import store from '@src/app/store';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@src/apollo-client';
import NextNprogress from 'nextjs-progressbar';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlDataForLayout, gqlGetAppSettings, gqlGetLinksBottom } from '@src/apollo-client/gql';
import AppProvider from '@src/contexts/AppContext';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import { httpUrl } from '@src/config/constrant';
import { formatUrlImage } from '@src/helper/formatHelper';
import Head from 'next/head';
import { useEffect } from 'react';
import parse from 'html-react-parser';

declare global {
	interface Window {
		workbox: any;
	}
}
function MyApp({ Component, pageProps }: any) {
	const {
		dataForLayout,
		dataNewestPosts, //của index page
		dataLinksBottom,
		dataAppSettings,
	} = pageProps;
	const seoImage = dataAppSettings?.seoImage?.url
		? [
				{
					url: formatUrlImage(dataAppSettings.seoImage.url),
					width: 800,
					height: 600,
					alt: dataAppSettings.seoTitle,
				},
		  ]
		: [];
	const defaultSeo: DefaultSeoProps = {
		title: dataAppSettings?.seoTitle || '',
		defaultTitle: dataAppSettings?.seoTitle || '',
		description: dataAppSettings?.seoDescription || '',
		openGraph: {
			type: dataAppSettings?.seoType || '',
			locale: 'vi_VN',
			site_name: dataAppSettings?.seoTitle || '',
			url: httpUrl,
			images: seoImage,
		},
		facebook: {
			appId: dataAppSettings?.seoFBAppId || '',
		},
		additionalMetaTags: [
			{
				property: 'google-site-verification',
				content: dataAppSettings?.seoGoogleSiteKey || '',
			},
			{
				property: 'keywords',
				content: dataAppSettings?.seoKeywords || '',
			},
		],
		additionalLinkTags: [
			{
				rel: 'apple-touch-icon',
				href: '/apple-touch-icon.png',
				sizes: '180x180',
			},
			{
				rel: 'icon',
				href: '/favicon-32x32.png',
				type: 'image/png',
				sizes: '32x32',
			},
			{
				rel: 'icon',
				href: '/favicon-16x16.png',
				type: 'image/png',
				sizes: '16x16',
			},
		],
	};
	if (Component.getLayout) {
		return <Component {...pageProps} />;
	}

	return (
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				{/* seo */}
				<Head>
					{/* header */}
					{/* <meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
					/>
					{dataAppSettings?.plugins?.scriptsHeaderGoogle &&
						parse(dataAppSettings.plugins.scriptsHeaderGoogle)}
					{dataAppSettings?.plugins?.scriptsHeaderFB &&
						parse(dataAppSettings.plugins.scriptsHeaderFB)} */}
					{/* <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" /> */}
				</Head>

				{dataForLayout ? (
					<AppProvider
						data={{
							featuredCategories: dataForLayout.featuredCategories,
							countPostsInCategory: dataForLayout.countPostsInCategory,
							dataTags: dataForLayout.tags,
							recommendedVideos: dataForLayout.recommendedVideos,
							dataLinksBottom: dataLinksBottom,
							dataNewestPosts: dataNewestPosts,
							dataPostsMostViews: dataForLayout.posts,
							dataAppSettings: dataAppSettings, //app setting and seo meta
						}}>
						<ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
						<Layout>
							<DefaultSeo {...defaultSeo} />
							<Component {...pageProps} />
						</Layout>
					</AppProvider>
				) : (
					<Component {...pageProps} />
				)}
				<NextNprogress
					color="#b91c1c"
					startPosition={0.6}
					stopDelayMs={200}
					height={2}
					showOnShallow={true}
				/>
			</ApolloProvider>
		</Provider>
	);
}
MyApp.getInitialProps = async (appContext: AppContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	/**
	 * get data for layout
	 */
	const dataForLayout = await getDataFromGql(gqlDataForLayout);
	/**
	 * get link bottom
	 */
	const dataLinksBottom = await getDataFromGql(gqlGetLinksBottom);
	/**
	 * get app seting - -seo
	 */
	const dataAppSettings = await getDataFromGql(gqlGetAppSettings);
	if (dataForLayout.error || dataLinksBottom.error || dataAppSettings.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	const appProps = await App.getInitialProps(appContext);
	return {
		pageProps: {
			...appProps.pageProps,
			dataForLayout: dataForLayout.data,
			dataLinksBottom: dataLinksBottom.data.linkBottomLabels,
			dataAppSettings: dataAppSettings.data.appSetting,
		},
	};
};
export default MyApp;
