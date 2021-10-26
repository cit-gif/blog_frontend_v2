import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlFindPost } from '@src/apollo-client/gql';
import { postInterface } from '@src/interfaceGlobal';
import React, { useEffect, useState } from 'react';
import { countStart, getQuerySearch } from '@src/helper/queryHelper';
import FindPostsPagination from '@src/components/FindPostsPagination';
import { useRouter } from 'next/router';
import { httpUrl, urlBySearch, _httpUrl } from '@src/config/constrant';
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
		 */
		router.push(
			{
				pathname: router.pathname,
				query: {
					q: query.searchString,
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
	}, [data]);
	const titleSeo = `Kết quả tìm kiếm của từ khóa: ${query.searchString} - Trang: ${query.page}`;
	const descriptionSeo = `Tìm kiếm - ${titleSeo}`;
	const urlSeo = `${httpUrl}${urlBySearch}?q=${query.searchString}&page=${query.page}`;
	return (
		<div className="w-full">
			<NextSeo
				title={titleSeo}
				description={descriptionSeo}
				openGraph={{
					url: urlSeo,
					title: titleSeo,
					description: descriptionSeo,
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
						name: '',
						item: urlSeo,
					},
				]}
			/>
			<FindPostsPagination
				data={{
					titleCate: titleSeo,
					dataFindPosts: dataFindPosts,
					urlPagination: `/${urlBySearch}?q=${query.searchString}&page=`,
					query: query,
					dataBreadcrumb: [{ label: 'Tìm kiếm', href: `` }],
					onChangePage: async (page: number) => {
						getDataPagination({
							variables: {
								searchString: query.searchString,
								start: countStart(query.limit, page),
								limit: query.limit,
							},
						});
						setCurrentPage(page);
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
