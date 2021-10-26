import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import BoxInfor from './BoxInfor';
import { useAppSelector } from '@src/hooks/reduxHook';
import { MyEyeIcon, MyLikeIcon, MyTimeIcon, MyUserIcon } from '../icons';
import { postInterface } from '@src/interfaceGlobal';
import {
	formatDateHelper,
	formatSlugForCategory,
	formatSlugForPost,
	formatTextReadMoreHelper,
	formatUrlForImage,
} from '@src/helper/formatHelper';
import { BsDot } from 'react-icons/bs';
interface Props {
	textTitleSize?: 'text-md' | 'text-lg' | 'text-xl';
	data: postInterface;
}
export default function WidgetArticleTextInnerSmall(props: Props) {
	const { textTitleSize = 'text-lg', data } = props;
	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	const classNameShadowDefault = useAppSelector(state => state.app.classNameShadowDefault);
	const classNameBoxWidgetDefault = useAppSelector(state => state.app.classNameBoxWidgetDefault);

	const urlPost = formatSlugForPost(data.slug);
	const timePublished = formatDateHelper(data.published_at);
	return (
		<div className="w-full">
			<div className="post rounded-lg overflow-hidden relative">
				<div className="absolute inset-x-0 bottom-0 rounded-lg overflow-hidden p-8 bg-gradient-to-b from-transparent to-neutral bg-opacity-10 text z-10 text-gray-50">
					{/* danh mục */}
					{data.category?.categoryName && (
						<Link href={formatSlugForCategory(data.category.slug)}>
							<a className="inline-block py-1 px-2 z-10 bg-primary text-white rounded-btn">
								{data.category.categoryName}
							</a>
						</Link>
					)}

					<h2 className="my-2">
						<Link href={urlPost}>
							<a className="text-2xl leading-tight">{data.postName}</a>
						</Link>
					</h2>
					<ul className="m-0 flex gap-2 text-sm font-medium">
						{/* tác giả */}
						{/* <li className="list-inline-item">
							<Link href="/">
								<a className="flex items-center gap-2">
									<BsDot />
									<span>{data.author.name}</span>
								</a>
							</Link>
						</li> */}
						<li>
							<span className="flex items-center gap-2">
								<MyTimeIcon />
								<time title={timePublished} dateTime={data.published_at}>
									{timePublished}
								</time>
							</span>
						</li>
						<li>
							<span className="flex items-center gap-2">
								<MyTimeIcon />
								{data.readingTime} phút đọc
							</span>
						</li>
					</ul>
				</div>
				<Link href={urlPost}>
					<a title={data.postName}>
						<div
							className={classNames(
								'skeleton-bg relative overflow-hidden shadow-md rounded-lg h-64',
								classNameRounedDefault,
								classNameShadowDefault
							)}>
							{data?.metaImage?.url && (
								<Image
									src={data.metaImage.url}
									objectFit="cover"
									objectPosition="center"
									alt={data.postName}
									layout="fill"
									className="transition duration-300 ease-in-out"
								/>
							)}
							{/* backdrop */}
							<div className="absolute inset-0 bg-neutral opacity-10"></div>
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
}
