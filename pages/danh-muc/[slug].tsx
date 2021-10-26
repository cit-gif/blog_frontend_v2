import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useAppSelector } from '@src/hooks/reduxHook';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlFindPost, gqlFindPostByCategory } from '@src/apollo-client/gql';
import { postInterface } from '@src/interfaceGlobal';
import React, { useEffect, useState } from 'react';
import { countStart, getQuerySearch } from '@src/helper/queryHelper';
import FindPostsPagination from '@src/components/FindPostsPagination';
import { useRouter } from 'next/router';
import { endUrlSlugLength, httpUrl, urlByCategory, urlBySearch } from '@src/config/constrant';
import { formatSlugForCategory } from '@src/helper/formatHelper';
import { useLazyQuery } from '@apollo/client';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import { useAppContext } from '@src/contexts/AppContext';
interface Props {
	dataFindPosts: {
		values: postInterface[];
		aggregate: {
			count: number;
		};
	};
	dataName: string;
	seoDescription: string;
	query: {
		slug: string;
		limit: number;
		start: number;
		page: number;
	};
}
const Categories: NextPage<Props> = props => {
	const { dataAppSettings } = useAppContext();
	const [getDataPagination, { loading, error, data, stopPolling }] = useLazyQuery(gqlFindPostByCategory);
	const [dataFindPosts, setDataFindPosts] = useState(props.dataFindPosts);
	const [query, setQuery] = useState(props.query);
	const [currentPage, setCurrentPage] = useState(0);
	const { dataName } = props;
	const router = useRouter();
	/**
	 * setState from props
	 */
	useEffect(() => {
		setDataFindPosts(props.dataFindPosts);
		setQuery(props.query);
		return () => {};
	}, [props.dataFindPosts, props.query]);
	useEffect(() => {
		/**
		 * format url cho nếu người dùng ko tự routing
		 *
		 */
		router.push(`/${urlByCategory}/${query.slug}?page=${query.page}`, undefined, { shallow: true });
		// router.push(
		// 	{
		// 		pathname: router.pathname,
		// 		query: {
		// 			page: query.page,
		// 		},
		// 	},
		// 	undefined,
		// 	{ shallow: true }
		// );
	}, []);
	// updateData
	useEffect(() => {
		if (data && data?.postsConnection) {
			setDataFindPosts(pre => ({ ...pre, ...data.postsConnection }));
			setQuery({
				...query,
				page: currentPage,
			});
		}
		return () => {
			if (stopPolling) stopPolling();
		};
	}, [data]);
	const url = `/${urlByCategory}/${query.slug}?page=`;
	//seo
	const titleSeo = `Danh mục: ${dataName} - Trang: ${currentPage === 0 ? query.page : currentPage}`;
	const seoDescription = props.seoDescription === '' ? `${titleSeo} ` : props.seoDescription;
	const urlSeo = `${httpUrl}${urlByCategory}/${query.slug}?page=${query.page}`;
	return (
		<div className="w-full">
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
						item: `${httpUrl}${urlByCategory}`,
					},
					{
						position: 3,
						name: dataName,
						item: urlSeo,
					},
				]}
			/>
			{/* end seo */}
			<FindPostsPagination
				data={{
					titleCate: titleSeo,
					dataFindPosts: dataFindPosts,
					urlPagination: url,
					urlForChange: url,
					query: query,
					dataBreadcrumb: [
						{ label: 'Danh mục', href: `/${urlByCategory}` },
						{ label: dataName, href: '' },
					],
					onChangePage: async (page: number) => {
						getDataPagination({
							variables: {
								slug: query.slug,
								start: countStart(query.limit, page),
								limit: query.limit,
							},
						});
						setCurrentPage(page);
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: 'smooth',
						});
					},
				}}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props | any> = async context => {
	if (context.params?.slug === '' || context.params?.slug === undefined) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}
	const { limit, page, start } = getQuerySearch(context);
	const slug = context.params.slug;
	const dataFindPosts = await getDataFromGql(gqlFindPostByCategory, {
		slug: slug,
		limit: limit,
		start: start,
	});

	/**
	 * nếu bị lỗi
	 */
	if (dataFindPosts.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	/**
	 * nếu không tìm thấy
	 */
	if (dataFindPosts.data.categories.length === 0) {
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}
	return {
		props: {
			dataFindPosts: dataFindPosts.data.postsConnection,
			dataName: dataFindPosts.data.categories[0]?.categoryName || '',
			seoDescription: dataFindPosts.data.categories[0]?.seoDescription || '',
			query: {
				slug: slug,
				limit: limit,
				start: start,
				page: page,
			},
		},
	};
};
export default Categories;
