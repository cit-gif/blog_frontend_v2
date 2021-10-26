import React, { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@src/hooks/reduxHook';
import classNames from 'classnames';
import Link from 'next/link';
import {
	MyAiOutlineLinkedin,
	MyAiOutlineTwitter,
	MyBsThreeDots,
	MyFaTelegramPlane,
	MyGrFacebookOption,
	MyTimeIcon,
	MyUserIcon,
} from '../icons';
import { postInterface } from '@src/interfaceGlobal';
import {
	formatDateHelper,
	formatSlugForCategory,
	formatSlugForPost,
	formatTextReadMoreHelper,
} from '@src/helper/formatHelper';
import { FiShare2 } from 'react-icons/fi';
interface Props {
	data: postInterface;
}
export default function WidgetArticleTextBottom(props: Props) {
	const { data } = props;
	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	const classNameShadowDefault = useAppSelector(state => state.app.classNameShadowDefault);
	const classNameBoxWidgetDefault = useAppSelector(state => state.app.classNameBoxWidgetDefault);
	const [openShare, setOpenShare] = useState(false);
	const altImg =
		data?.metaImage?.alternativeText == '' || !data?.metaImage?.alternativeText
			? data.postName
			: data.metaImage.alternativeText;
	const urlPost = formatSlugForPost(data.slug);

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="post relative flex-none w-full h-52">
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
				{data.category?.categoryName && (
					<div>
						{/* // <div className="badge badge-primary badge-lg text-gray-100 absolute z-10 bottom-4 inset-x-4 shadow-sm font-semibold"> */}
						<Link href={formatSlugForCategory(data.category.slug)}>
							<a className="py-1 px-2 bg-primary text-white rounded-btn font-medium">
								{data.category.categoryName}
							</a>
						</Link>
					</div>
				)}
				<h2 className="text-xl">
					<Link href={urlPost}>
						<a>{data.postName}</a>
					</Link>
				</h2>
				<ul className="flex flex-wrap gap-2 text-base-content text-opacity-90 text-sm">
					<li>
						<div className="flex gap-2 items-center">
							<MyUserIcon />
							{data.author.name}
						</div>
					</li>

					<li>
						<div className="flex items-center gap-2">
							<MyTimeIcon />
							<time dateTime={data.published_at}>
								{formatDateHelper(data.published_at)}
							</time>
						</div>
					</li>
					<li>
						<div className="flex items-center gap-2">
							<MyTimeIcon />
							<span>{data.readingTime} phút đọc</span>
						</div>
					</li>
				</ul>
				<p className="text-sm text-base-content text-opacity-90">
					{formatTextReadMoreHelper(data.summary || '')}
				</p>
				{/* <div className="px-2 flex items-center justify-between text-base-content text-opacity-80">
					<div className="flex items-center gap-2">
						<button
							onClick={() => setOpenShare(!openShare)}
							className="toggle-button icon-share">
							<FiShare2 />
						</button>
						<span
							className={classNames('w-5 border-t transition-all', {
								'opacity-0 invisible': !openShare,
								'opacity-1 visible': openShare,
							})}
						/>
						<ul
							className={classNames('flex items-center gap-2 transition-all', {
								'opacity-0 invisible': !openShare,
								'opacity-1 visible': openShare,
							})}>
							<li className="list-inline-item">
								<a className="btn btn-xs btn-ghost text-lg" href="#">
									<MyGrFacebookOption />
								</a>
							</li>
							<li className="list-inline-item">
								<a className="btn btn-xs btn-ghost text-lg" href="#">
									<MyAiOutlineTwitter widths={32} xHeight={32} />
								</a>
							</li>
							<li className="list-inline-item">
								<a className="btn btn-xs btn-ghost text-lg" href="#">
									<MyFaTelegramPlane />
								</a>
							</li>
							<li className="list-inline-item">
								<a className="btn btn-xs btn-ghost text-lg" href="#">
									<MyAiOutlineLinkedin />
								</a>
							</li>
						</ul>
					</div>
					<div>
						<a href="#">
							<MyBsThreeDots />
						</a>
					</div>
				</div> */}
			</div>
		</div>
	);
	// 	return (
	// 		<div
	// 			className={classNames(
	// 				'w-full h-full overflow-hidden widget-box-out-size',
	// 				classNameShadowDefault,
	// 				classNameBoxWidgetDefault
	// 			)}>
	// 			<Link href={urlPost}>
	// 				<a
	// 					title={data.postName}
	// 					className={classNames(
	// 						'relative w-full h-48 block overflow-hidden shadow-sm mb-4 skeleton-bg',
	// 						classNameRounedDefault
	// 					)}>
	// 					{data?.metaImage?.url && (
	// 						<Image
	// 							src={data.metaImage.url}
	// 							objectFit="cover"
	// 							objectPosition="center"
	// 							alt={data.postName}
	// 							layout="fill"
	// 							loading="lazy"
	// 						/>
	// 					)}
	// 				</a>
	// 			</Link>
	// 			{/* <Panel bodyFill> */}
	// 			<Panel>
	// 				<Link href={urlPost}>
	// 					<a>
	// 						<h2 className="text-lg text-primary">{data?.postName}</h2>
	// 					</a>
	// 				</Link>
	// 				<div className="flex flex-wrap text-xs md:text-sm space-x-2 my-2">
	// 					<span className="flex items-center space-x-1" title={data.author?.name}>
	// 						<MyUserIcon />
	// 						<span>{data?.author?.name}</span>
	// 						{/* Cho trâng tác giả */}
	// 						{/* <Link href="/">
	// 							<a title={data.author?.name}>{data?.author?.name}</a>
	// 						</Link> */}
	// 					</span>
	// 					<span className="flex items-center space-x-1">
	// 						<MyTimeIcon />
	// 						<time dateTime={data.published_at}>{formatDateHelper(data.published_at)}</time>
	// 					</span>
	// 					{data.readingTime && (
	// 						<span className="flex items-center space-x-1">
	// 							<MyTimeIcon />
	// 							<span>{data.readingTime} phút đọc</span>
	// 						</span>
	// 					)}
	// 					{/* <span className="flex items-center space-x-1">
	// 						<MyEyeIcon />
	// 						<span data-seen={data.seen}>{data.seen}</span>
	// 					</span>
	// 					<span className="flex items-center space-x-1">
	// 						<MyLikeIcon />
	// 						<span date-like={data.like}>{data.like}</span>
	// 					</span> */}
	// 				</div>
	// 				<p className="text-xs md:text-sm leading-5">{formatTextReadMoreHelper(data.summary)}</p>
	// 			</Panel>
	// 		</div>
	// 	);
}
