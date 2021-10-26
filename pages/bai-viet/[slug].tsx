import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useAppSelector } from '@src/hooks/reduxHook';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlDataForLayout, gqlPostDetails, gqlRelatedPosts, gqlUpdateViewsForPost } from '@src/apollo-client/gql';
import { postDetailsInterface } from '@src/interfaceGlobal';
import { endUrlSlugLength, httpUrl, urlByPost, _httpUrl } from '@src/config/constrant';
import MyBreadcrumb from '@src/components/MyBreadcrumb';
import { getBreadcrumbForPost } from '@src/helper/getDataBreadcrumb';
import React, { useEffect } from 'react';
import PostDetailsComponent from '@src/components/Post';
import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/client';
import { ArticleJsonLd, BreadcrumbJsonLd, NewsArticleJsonLd, NextSeo, NextSeoProps } from 'next-seo';
import { formatSlugForPost, formatUrlImage } from '@src/helper/formatHelper';
import { defaultSeo } from '@src/config/seo.config';
import { useAppContext } from '@src/contexts/AppContext';
interface Props {
	dataForPostDetails: postDetailsInterface;
	dataRelatedPosts: any;
}
const Home: NextPage<Props> = props => {
	const { dataAppSettings } = useAppContext();
	const { dataForPostDetails } = props;
	const [addTodo] = useMutation(gqlUpdateViewsForPost, {
		variables: { id: dataForPostDetails.id },
	});
	useEffect(() => {
		//update views post
		addTodo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const urlSeo = `${_httpUrl}${formatSlugForPost(dataForPostDetails.slug)}`;
	const seoDescription = dataForPostDetails.summary || dataForPostDetails.postName;
	const seoObj = {
		title: dataForPostDetails.postName,
		description: seoDescription,

		openGraph: {
			title: dataForPostDetails.postName,
			description: seoDescription,
			url: urlSeo,
			type: 'article',
			article: {
				publishedTime: dataForPostDetails.published_at,
				modifiedTime: dataForPostDetails.updatedAt,
				authors: [dataForPostDetails.author.name],
				tags: dataForPostDetails?.tags?.map(item => item.name),
			},
			images: [
				{
					url: dataForPostDetails.metaImage?.url || '',
					width: 950,
					height: 650,
					alt:
						dataForPostDetails.metaImage?.alternativeText ||
						defaultSeo.title ||
						dataForPostDetails.postName,
				},
			],
		},
		additionalLinkTags: [
			{
				rel: 'canonical',
				href: urlSeo,
			},
		],
	};

	return (
		<div className="flex flex-col gap-8">
			{/*
			 * seo
			 */}
			<BreadcrumbJsonLd
				itemListElements={[
					{
						position: 1,
						name: 'Trang chủ',
						item: httpUrl,
					},
					{
						position: 2,
						name: 'Bài viết',
						item: `${httpUrl}${urlByPost}?page=1`,
					},
					{
						position: 3,
						name: dataForPostDetails?.postName || '',
						item: urlSeo,
					},
				]}
			/>
			{/* <ArticleJsonLd
				url={seoObj.openGraph?.url || ''}
				title={seoObj.title}
				images={[dataForPostDetails?.metaImage?.url || '']}
				datePublished={seoObj.openGraph.article.publishedTime}
				dateModified={seoObj.openGraph.article.modifiedTime}
				authorName={[dataForPostDetails.author.name]}
				publisherName={dataForPostDetails.author.name}
				publisherLogo={formatUrlImage(dataAppSettings?.seoImage?.url || '')}
				description={seoObj.description}
			/> */}
			<NewsArticleJsonLd
				url={seoObj.openGraph?.url || ''}
				title={seoObj.title}
				images={[dataForPostDetails?.metaImage?.url || '']}
				section={dataForPostDetails?.category?.categoryName || ''}
				keywords={dataForPostDetails?.metaKeywords || ''}
				dateCreated={seoObj.openGraph.article.publishedTime}
				datePublished={seoObj.openGraph.article.publishedTime}
				dateModified={seoObj.openGraph.article.modifiedTime}
				authorName={[dataForPostDetails.author.name]}
				publisherName={dataForPostDetails.author.name}
				publisherLogo={formatUrlImage(dataAppSettings?.seoImage?.url || '')}
				description={seoObj?.description || ''}
				body={seoObj?.description || ''}
			/>
			<NextSeo {...seoObj} />
			<MyBreadcrumb
				data={getBreadcrumbForPost({
					label: dataForPostDetails.postName,
					href: dataForPostDetails.slug,
				})}
			/>

			<PostDetailsComponent relatedPosts={props.dataRelatedPosts} data={dataForPostDetails} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props | any> = async context => {
	const slug = context.params?.slug?.slice(0, -endUrlSlugLength) || '';
	const dataForPostDetails = await getDataFromGql(gqlPostDetails, { slug: slug });
	if (dataForPostDetails.error) {
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
	if (dataForPostDetails.data.posts.length === 0) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}
	/**
	 * bài viết liên quan
	 */
	const relatedPosts = await getDataFromGql(gqlRelatedPosts, { slug: slug });
	if (relatedPosts.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	return {
		props: {
			dataForPostDetails: dataForPostDetails.data.posts[0],
			dataRelatedPosts: relatedPosts.data.categories,
		},
	};
};
export default Home;
