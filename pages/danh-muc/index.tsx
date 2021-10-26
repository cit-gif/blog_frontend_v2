import FlexLayout from '@src/components/FlexLayout';
import MyBreadcrumb from '@src/components/MyBreadcrumb';
import { httpUrl, urlByCategory } from '@src/config/constrant';
import { useAppContext } from '@src/contexts/AppContext';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import React from 'react';

export default function Categories() {
	const { countPostsInCategory } = useAppContext();
	const getArrayLink = countPostsInCategory.map(item => ({ text: item.categoryName, slug: item.slug }));
	const titleSeo = 'Tất cả danh mục bài viết';
	const seoDescription = `${titleSeo}`;
	const urlSeo = `${httpUrl}${urlByCategory}`;
	return (
		<div>
			{/* seo */}
			<NextSeo
				title={titleSeo}
				description={seoDescription}
				openGraph={{
					url: urlSeo,
					title: titleSeo,
					description: seoDescription,
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
						name: 'Danh mục',
						item: urlSeo,
					},
				]}
			/>
			{/* end seo */}
			<MyBreadcrumb data={[{ label: 'Danh mục', href: urlSeo }]} />
			<FlexLayout arrayLink={getArrayLink} type="category" />
		</div>
	);
}
