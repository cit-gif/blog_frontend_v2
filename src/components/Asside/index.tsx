import React from 'react';
import Categorys from './Categorys';
import ColumnWidget from '../Widget/ColumnWidget';
import WidgetArticleTextBottom from '../Widget/WidgetArticleTextBottom';
import WidgetArticleTextRight from '../Widget/WidgetArticleTextRight';
import TagsAside from './TagsAside';
import VideosAside from './VideosAside';
import {
	categoryCountPostInterface,
	postInterface,
	recommendedVideosInterface,
	tagArticleInterface,
} from '@src/interfaceGlobal';
import FormContact from './FormContact';
import { useAppSelector } from '@src/hooks/reduxHook';
import { useAppContext } from '@src/contexts/AppContext';
import { urlByTag } from '@src/config/constrant';
import parse from 'html-react-parser';
import Box from '../Box';
import TitleCate from '../TitleCate';
import WidgetArticleTextRightSmall from '../Widget/WidgetArticleTextRightSmall';
import Divider from '../Divider';
export default function AssideApp() {
	// tính lại top của aside dựa vào headerHeight
	const headerHeight: number = useAppSelector(state => state.app.headerHeight);

	const { dataPostsMostViews, dataAppSettings } = useAppContext();
	return (
		<div className="sticky flex flex-col gap-8" style={{ top: headerHeight }}>
			{/* quảng cáo	 */}
			{dataAppSettings?.plugins?.adsAsside && (
				<div className="shadow w-full h-52">{parse(dataAppSettings.plugins.adsAsside)}</div>
			)}
			<Box>
				<div className="flex flex-col justify-center">
					<TitleCate title="Nhận tư vấn chứng khoán" />
					<FormContact />
				</div>
			</Box>
			<Box>
				<div className="flex flex-col justify-center ">
					<TitleCate title="Bài viết phổ biến" />
					{dataPostsMostViews && (
						<div className="flex flex-col gap-3">
							{dataPostsMostViews.map((post, key) => (
								<div key={key}>
									<WidgetArticleTextRightSmall data={post} />
									<Divider />
								</div>
							))}
						</div>
					)}
				</div>
			</Box>
			<Box>
				<div className="flex flex-col justify-center">
					<TitleCate title="Videos đề xuất" />
					<VideosAside />
				</div>
			</Box>
			<Box>
				<div className="flex flex-col justify-center">
					<TitleCate title="Danh mục" />
					<Categorys />
				</div>
			</Box>
			<Box>
				<div className="flex flex-col justify-center">
					<TitleCate title="Thẻ bài viết" />
					<TagsAside />
				</div>
			</Box>
		</div>
	);
}
