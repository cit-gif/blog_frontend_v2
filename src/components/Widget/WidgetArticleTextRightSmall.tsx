import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '@src/hooks/reduxHook';
import classNames from 'classnames';
import Link from 'next/link';
import { MyEyeIcon, MyLikeIcon, MyTimeIcon, MyUserIcon } from '../icons';
import { postInterface } from '@src/interfaceGlobal';
import {
	formatDateHelper,
	formatSlugForAuthor,
	formatSlugForCategory,
	formatSlugForPost,
	formatTextReadMoreHelper,
	formatUrlForImage,
} from '@src/helper/formatHelper';
interface Props {
	size?: 'lg' | 'sm';
	data: postInterface;
}
export default function WidgetArticleTextRightSmall(props: Props) {
	const { size = 'sm', data } = props;

	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	const classNameShadowDefault = useAppSelector(state => state.app.classNameShadowDefault);
	const classNameBoxWidgetDefault = useAppSelector(state => state.app.classNameBoxWidgetDefault);

	const urlPost = formatSlugForPost(data.slug);
	return (
		<div className="w-full flex gap-4">
			<div className="post relative flex-none w-24 h-20">
				{/* <span className="post-format-sm">
						<i className="icon-picture" />
					</span> */}

				<Link href={urlPost}>
					<a>
						<div className="skeleton-bg relative w-full h-full rounded-lg overflow-hidden">
							{data.metaImage?.url && (
								<Image
									src={data.metaImage.url}
									objectFit="cover"
									objectPosition="center"
									alt={data.postName}
									layout="fill"
									loading="lazy"
									className="transition-all duration-300 ease-in-out"
								/>
							)}
						</div>
					</a>
				</Link>
			</div>
			<div className="flex flex-col gap-3">
				<h2>
					<Link href={urlPost}>
						<a>{data.postName}</a>
					</Link>
				</h2>
				<ul className="flex gap-1 text-base-content text-opacity-90 text-sm lg:text-2xs xl:text-sm">
					{/* <li>
						<div className="flex gap-2 items-center">
							<MyUserIcon />
							{data.author.name}
						</div>
					</li> */}

					<li>
						<div className="flex items-center gap-1">
							<MyTimeIcon />
							<time dateTime={data.published_at}>
								{formatDateHelper(data.published_at)}
							</time>
						</div>
					</li>
					<li>
						<div className="flex items-center gap-1">
							<MyTimeIcon />
							<span>{data.readingTime} phút đọc</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
	// return (
	// 	<div
	// 		className={classNames(
	// 			'w-full flex items-center gap-2 widget-box-out-size',
	// 			classNameShadowDefault,
	// 			classNameBoxWidgetDefault
	// 			// {
	// 			// 	'flex-col md:flex-row': size === 'lg',
	// 			// }
	// 		)}>
	// 		<Link href={urlPost}>
	// 			<a
	// 				title={data.postName}
	// 				className={classNames(
	// 					'relative min-w-min m-0 flex-shrink flex-none inline-block overflow-hidden shadow-sm skeleton-bg transition-all',
	// 					classNameRounedDefault,
	// 					{
	// 						// 'h-24 w-32': size === 'sm',
	// 						'h-32 w-36': size === 'sm',

	// 						// 'h-40 w-full md:w-56': size === 'lg',
	// 						'h-32 w-36 md:h-40 md:w-52': size === 'lg',
	// 					}
	// 				)}>
	// 				{data.metaImage?.url && (
	// 					<Image
	// 						src={data.metaImage.url}
	// 						objectFit="cover"
	// 						objectPosition="center"
	// 						alt={data.postName}
	// 						layout="fill"
	// 						loading="lazy"
	// 					/>
	// 				)}
	// 			</a>
	// 		</Link>
	// 		<div className="flex-1 p-1">
	// 			{/* <Tag>{data.category?.categoryName}</Tag> */}
	// 			{/* <div className="z-10">
	// 				<Tag color="green">{data.category?.categoryName}ádas</Tag>
	// 			</div> */}
	// 			<Link href={urlPost}>
	// 				<a>
	// 					<h2 className="text-sm md:text-base text-primary">{data.postName}</h2>
	// 				</a>
	// 			</Link>
	// 			<div className="flex flex-wrap items-center text-xs md:text-sm space-x-2 my-2">
	// 				<span className="flex items-center space-x-1">
	// 					<MyUserIcon />
	// 					<span>{data.author.name}</span>
	// 					{/* <Link href="/">
	// 						<a>{data.author.name}</a>
	// 					</Link> */}
	// 				</span>
	// 				<span className="flex items-center space-x-1">
	// 					<MyTimeIcon />
	// 					<time dateTime={data.published_at}>{formatDateHelper(data.published_at)}</time>
	// 				</span>
	// 				{data.readingTime && (
	// 					<span className="flex items-center space-x-1">
	// 						<MyTimeIcon />
	// 						<span>{data.readingTime} phút đọc</span>
	// 					</span>
	// 				)}
	// 				{/* <span className="flex items-center space-x-1">
	// 					<MyEyeIcon />
	// 					<span>{data.seen}</span>
	// 				</span>
	// 				<span className="flex items-center space-x-1">
	// 					<MyLikeIcon />
	// 					<span>{data.like}</span>
	// 				</span> */}
	// 			</div>
	// 			{/* {size === 'lg' && (
	// 				<p className="text-sm">
	// 					{formatTextReadMore(data.postName)}

	// 				</p>
	// 			)} */}

	// 			<p className="text-xs md:text-sm">{formatTextReadMoreHelper(data.summary || '')}</p>
	// 		</div>
	// 	</div>
	// );
}
