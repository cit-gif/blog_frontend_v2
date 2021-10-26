import { breadcrumbInterface, postInterface } from '@src/interfaceGlobal';
import React from 'react';
import Box from '../Box';
import Divider from '../Divider';
// import { Pagination } from 'rsuite';
import MyBreadcrumb from '../MyBreadcrumb';
import PaginationNotLink from '../Pagination/PaginationNotLink';
import WidgetArticleTextBottom from '../Widget/WidgetArticleTextBottom';
interface Props {
	data: {
		titleCate?: string;
		dataFindPosts: {
			values: postInterface[];
			aggregate: {
				count: number;
			};
		};
		query: {
			searchString?: string;
			limit: number;
			start: number;
			page: number;
		};
		urlForChange?: string;
		urlPagination: string;
		dataBreadcrumb: breadcrumbInterface[];
		onChangePage?: (page: number) => Promise<void>;
	};
}
export default function FindPostsPagination(props: Props) {
	const { data } = props;
	const checkIsEmptyPosts = data.dataFindPosts.values.length === 0;
	return (
		<div className="flex flex-col">
			<MyBreadcrumb data={data.dataBreadcrumb} />
			{data.titleCate && <h2 className="text-2xl my-8">{data.titleCate}</h2>}

			<Box>
				<div className="flex flex-wrap gap-8 md:gap-4 mb-8">
					{checkIsEmptyPosts ? (
						<span>Không tìm thấy bài viết</span>
					) : (
						data.dataFindPosts.values.map((item, key) => (
							<div className="w-full md:w-[calc(50%-0.5rem)]" key={key}>
								<WidgetArticleTextBottom data={item} />
								<Divider />
							</div>
						))
					)}
				</div>
			</Box>
			{!checkIsEmptyPosts && (
				<PaginationNotLink
					totalCount={data.dataFindPosts.aggregate.count}
					currentPage={data.query.page}
					pageSize={data.query.limit}
					className=""
					urlForChange={data.urlForChange}
					url={data.urlPagination}
					handler={data.onChangePage}
				/>
			)}
		</div>
	);
}
