import { separateArray } from '@src/helper/arrayHelper';
import getWidthFromGapCss from '@src/helper/getWidthFromGapCss';
import { useAppSelector } from '@src/hooks/reduxHook';
import { postInterface } from '@src/interfaceGlobal';
import classNames from 'classnames';
import React from 'react';
import Box from '../Box';
import Divider from '../Divider';
import TitleCate from '../TitleCate';
// import { Divider } from 'rsuite';
import NotFoundArticle from './NotFoundArticle';
import WidgetArticleTextBottom from './WidgetArticleTextBottom';
import WidgetArticleTextRightSmall from './WidgetArticleTextRightSmall';
interface Props {
	data?: {
		category: {
			categoryName: string;
			id: string;
			slug: string;
			posts: postInterface[];
		};
	};
}
export default function LayoutWidgetLargePostInTop(props: Props) {
	const classNameFlexGapDefault = useAppSelector(state => state.app.classNameFlexGapDefault);
	if (!props.data || props?.data?.category?.posts?.length === 0) {
		return <NotFoundArticle />;
	}
	/**
	 * lấy css gap : gap-4
	 * mỗi 1 đơn vị - 0.25 rem //tailwindcss
	 * vì khi flex wrap mà gap nữa thì nó sẽ xún hàng
	 */
	const cssWidthMdBreakpoints = getWidthFromGapCss(classNameFlexGapDefault);
	// chia đôi array post
	// sẽ thành [[],[]]
	const separatePostArrayy = separateArray(props.data.category.posts);
	return (
		<div>
			<TitleCate title={props.data.category.categoryName} />
			<Box>
				<div className="flex flex-wrap gap-4">
					{/* bài viết lớn ở bên trái */}
					{separatePostArrayy.map((item: postInterface[], key: number) => (
						<div
							key={key}
							className={classNames('w-full flex flex-col', cssWidthMdBreakpoints)}>
							{item.map((item2, key2) => {
								/**
								 * Nếu muốn hiển thị tên danh mục
								 *
								 */
								// const itemAddCategory = {
								// 	...item2,
								// 	category: {
								// 		categoryName: props.data?.category.categoryName || '',
								// 		slug: props.data?.category.slug || '',
								// 		id: props.data?.category.id || '',
								// 	},
								// };
								if (key2 === 0) {
									// bài viết đầu tiên lớn
									return (
										<div key={key2} className="w-full">
											<WidgetArticleTextBottom data={item2} />
											<Divider />
										</div>
									);
								}
								return (
									<div key={key2} className="w-full">
										<WidgetArticleTextRightSmall data={item2} />
										<Divider />
									</div>
								);
							})}
						</div>
					))}
				</div>
			</Box>
		</div>
	);
}
