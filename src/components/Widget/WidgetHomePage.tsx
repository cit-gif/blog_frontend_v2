import { useAppContext } from '@src/contexts/AppContext';
import classNames from 'classnames';
import React, { useState } from 'react';
import Box from '../Box';
import Divider from '../Divider';
import WidgetArticleTextInner from './WidgetArticleTextInner';
import WidgetArticleTextRightSmall from './WidgetArticleTextRightSmall';
type selectType = 'Gần đây' | 'Phổ biến';
type optionType = {
	title: selectType;
}[];
const options: optionType = [
	{
		title: 'Gần đây',
	},
	{
		title: 'Phổ biến',
	},
];
export default function WidgetHomePage() {
	const { dataNewestPosts, dataPostsMostViews } = useAppContext();
	const [activeTab, setActiveTab] = useState<selectType>('Gần đây');
	if (!dataNewestPosts) {
		// nếu kkhoo có thì
		return null;
	}
	return (
		<div className="w-full flex flex-wrap gap-8">
			<div className="w-full lg:w-[calc(66.666667%-1rem)]">
				{/* hiển thị bài viết mới nhất to bự */}
				{dataNewestPosts[0] && <WidgetArticleTextInner data={dataNewestPosts[0]} />}
			</div>
			<div className="w-full lg:w-[calc(33.333333%-1rem)]">
				{/* hiển thị tab */}
				<Box>
					<ul className="flex gap-2 mb-8 justify-center" role="tablist">
						{options.map((item, key) => {
							const selected = item.title === activeTab;
							return (
								<li key={key} role="presentation">
									<button
										onClick={() => setActiveTab(item.title)}
										className={classNames(
											'btn rounded-full normal-case font-medium px-8',
											{
												'btn-outline': !selected,
												'btn-primary': selected,
											}
										)}
										role="tab"
										type="button"
										aria-label={item.title}
										// aria-controls={item.title}
										// aria-selected={selected}
									>
										{item.title}
									</button>
								</li>
							);
						})}
					</ul>
					<div>
						{options.map((item, key) => {
							const selected = item.title === activeTab;
							if (item.title === 'Gần đây') {
								return (
									<div
										key={key}
										className={classNames('w-full flex flex-col gap-2', {
											'hidden invisible': !selected,
											visible: selected,
										})}
										role="tabpanel"
										aria-labelledby={item.title}>
										{
											// bỏ qua bài viết đầu tiên
											dataNewestPosts.map((item2, key2) =>
												key2 < 4 && key2 !== 1 ? (
													<div key={key2}>
														<WidgetArticleTextRightSmall
															data={item2}
														/>
														<Divider />
													</div>
												) : null
											)
										}
									</div>
								);
							}
							return (
								<div
									key={key}
									className={classNames('w-full flex flex-col gap-2', {
										'hidden invisible': !selected,
										visible: selected,
									})}
									role="tabpanel"
									aria-labelledby={item.title}>
									{dataPostsMostViews.map((item2, key2) =>
										key2 < 3 ? (
											<div key={key2}>
												<WidgetArticleTextRightSmall data={item2} />
												<Divider />
											</div>
										) : null
									)}
								</div>
							);
						})}
					</div>
				</Box>
			</div>
		</div>
	);
}
