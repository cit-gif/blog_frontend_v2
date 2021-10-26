import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlFindPost } from '@src/apollo-client/gql';
import { postInterface } from '@src/interfaceGlobal';
import React, { useEffect, useState } from 'react';
import { countStart, getQuerySearch } from '@src/helper/queryHelper';
import FindPostsPagination from '@src/components/FindPostsPagination';
import { useRouter } from 'next/router';
import { httpUrl, urlByPost, urlBySearch } from '@src/config/constrant';
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
	query: {
		searchString: string;
		limit: number;
		start: number;
		page: number;
	};
}
const Search: NextPage<Props> = props => {
	const { dataAppSettings } = useAppContext();
	const [dataFindPosts, setDataFindPosts] = useState(props.dataFindPosts);
	const [query, setQuery] = useState(props.query);
	const [currentPage, setCurrentPage] = useState(0);
	const [getDataPagination, { loading, error, data, stopPolling }] = useLazyQuery(gqlFindPost);

	const router = useRouter();

	useEffect(() => {
		/**
		 * format url cho nếu người dùng ko tự routing
		 */
		router.push(
			{
				pathname: router.pathname,
				query: {
					page: query.page,
				},
			},
			undefined,
			{ shallow: true }
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// updateData
	useEffect(() => {
		if (data && data?.postsConnection) {
			setDataFindPosts({ ...data.postsConnection });
			setQuery({
				...query,
				page: currentPage,
			});
		}
		return () => {
			if (stopPolling) stopPolling();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	const titleSeo = `Bài viết gần đây - Trang: ${currentPage === 0 ? query.page : currentPage}`;
	const seoDescription = 'Bài viết gần đây - Cập nhập những bài viết mới nhất  - Tất cả bài viết';
	const urlSeo = `${httpUrl}${urlByPost}?page=${query.page}`;
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
						name: 'Bài viết',
						item: urlSeo,
					},
				]}
			/>
			{/* end seo */}
			<FindPostsPagination
				data={{
					titleCate: titleSeo,
					dataFindPosts: dataFindPosts,
					urlPagination: `/${urlByPost}?page=`,
					query: query,
					dataBreadcrumb: [{ label: 'Bài viết', href: `` }],
					onChangePage: async (page: number) => {
						getDataPagination({
							variables: {
								searchString: query.searchString,
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
	const { searchString, limit, page, start } = getQuerySearch(context);
	const dataFindPosts = await getDataFromGql(gqlFindPost, {
		searchString: searchString,
		limit: limit,
		start: start,
	});

	if (dataFindPosts.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	return {
		props: {
			dataFindPosts: dataFindPosts.data.postsConnection,
			query: {
				searchString: searchString,
				limit: limit,
				start: start,
				page: page,
			},
		},
	};
};
export default Search;
