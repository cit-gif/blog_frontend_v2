import FlexLayout from '@src/components/FlexLayout';
import MyBreadcrumb from '@src/components/MyBreadcrumb';
import { httpUrl, urlByTag } from '@src/config/constrant';
import { useAppContext } from '@src/contexts/AppContext';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import React from 'react';

export default function Categories() {
	const { dataTags, dataAppSettings } = useAppContext();
	if (!dataTags) return null;
	const getArrayLink = dataTags.map(item => ({ text: item.name, slug: item.slug }));
	const titleSeo = 'Tất cả thẻ bài viết';
	const urlSeo = `${httpUrl}${urlByTag}`;
	return (
		<div>
			<NextSeo
				title={titleSeo}
				description={titleSeo}
				openGraph={{
					url: urlSeo,
					title: titleSeo,
					description: titleSeo,
				}}
				additionalLinkTags={[{ rel: 'canonical', href: urlSeo }]}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Trang chủ',
						item: httpUrl,
					},
					{
						position: 2,
						name: 'Thẻ',
						item: urlSeo,
					},
				]}
			/>
			{/* end seo */}
			<MyBreadcrumb data={[{ label: 'Thẻ', href: '' }]} />
			<FlexLayout arrayLink={getArrayLink} type="tags" />
		</div>
	);
}
