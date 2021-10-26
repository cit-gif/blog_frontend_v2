import { DefaultSeoProps } from 'next-seo';
import { httpUrl } from './constrant';

export const defaultSeo: DefaultSeoProps = {
	canonical: httpUrl,
	openGraph: {
		type: 'website',
		locale: 'vi_VN',
		url: httpUrl,
		// site_name: appName, // tên trang web
	},
	// facebook: {
	// 	appId: '211861074210282',
	// },
};
