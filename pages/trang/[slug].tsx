import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useAppSelector } from '@src/hooks/reduxHook';
import { getDataFromGql } from '@src/apollo-client/services';
import {
	gqlDataForLayout,
	gqlGetLinksBottomDetails,
	gqlPostDetails,
	gqlUpdateViewsForPost,
} from '@src/apollo-client/gql';
import { linkBottomItemInterface, postDetailsInterface } from '@src/interfaceGlobal';
import { endUrlSlugLength, httpUrl, urlByPage, _httpUrl } from '@src/config/constrant';
import MyBreadcrumb from '@src/components/MyBreadcrumb';
import { getBreadcrumbForPost } from '@src/helper/getDataBreadcrumb';
import React, { useEffect } from 'react';
import PostDetailsComponent from '@src/components/Post';
import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/client';
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo, NextSeoProps } from 'next-seo';
import { formatSlugForPost } from '@src/helper/formatHelper';
import { defaultSeo } from '@src/config/seo.config';
import PageDetailsComponent from '@src/components/Page';
import { useAppContext } from '@src/contexts/AppContext';
interface Props {
	dataLinkBottomDetails: linkBottomItemInterface;
	query: { slug: string };
}
const PageDetails: NextPage<Props> = props => {
	const { dataAppSettings } = useAppContext();
	const { dataLinkBottomDetails, query } = props;
	const titleSeo = dataLinkBottomDetails.text;
	const urlSeo = `${httpUrl}${urlByPage}/${query.slug}`;
	return (
		<div className="flex flex-col">
			<NextSeo
				title={titleSeo}
				// description={`${dataAppSettings.seoDescription} - ${titleSeo} `}
				description={dataLinkBottomDetails.seoDescription}
				openGraph={{
					url: `${httpUrl}${urlByPage}`,
					title: titleSeo,
					description: dataLinkBottomDetails.seoDescription,
				}}
				additionalLinkTags={[{ rel: 'canonical', href: urlSeo }]}
			/>
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Trang chủ',
						item: _httpUrl,
					},
					{
						position: 2,
						name: dataLinkBottomDetails.text,
						item: urlSeo,
					},
				]}
			/>
			<MyBreadcrumb
				data={[
					{
						label: dataLinkBottomDetails.text,
						href: dataLinkBottomDetails.url,
					},
				]}
			/>
			<PageDetailsComponent data={dataLinkBottomDetails} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props | any> = async context => {
	const slug = context.params?.slug?.slice(0, -endUrlSlugLength) || '';
	const dataLinkBottomDetails = await getDataFromGql(gqlGetLinksBottomDetails, { slug: slug });
	if (dataLinkBottomDetails.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	/**
	 * nếu có slug mà không tìm thấy thì hiển thị trang 404
	 */
	if (dataLinkBottomDetails.data.linkBottomItems.length === 0) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}

	return {
		props: {
			dataLinkBottomDetails: dataLinkBottomDetails.data.linkBottomItems[0],
			query: {
				slug,
			},
		},
	};
};
export default PageDetails;
