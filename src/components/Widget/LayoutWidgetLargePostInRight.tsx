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
export default function LayoutWidgetLargePostInRight(props: Props) {
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
	return (
		<div>
			<TitleCate title={props.data.category.categoryName} />
			<Box>
				<div className="flex flex-wrap gap-4">
					{/* bài viết lớn ở bên trái */}
					{props.data.category.posts[0] && (
						<div className={classNames('w-full', cssWidthMdBreakpoints)}>
							<WidgetArticleTextBottom data={props.data.category.posts[0]} />
						</div>
					)}
					<div className={classNames('w-full', cssWidthMdBreakpoints)}>
						{props.data.category.posts.map((item, key) => {
							{
								return key !== 0 ? (
									<div key={key} className="w-full flex flex-col">
										<WidgetArticleTextRightSmall data={item} />
										<Divider />
									</div>
								) : null;
							}
						})}
					</div>
				</div>
			</Box>
		</div>
	);
}
