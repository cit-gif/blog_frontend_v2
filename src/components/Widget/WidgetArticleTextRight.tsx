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
	formatUrlImage,
} from '@src/helper/formatHelper';
interface Props {
	size?: 'lg' | 'sm';
	data: postInterface;
}
export default function WidgetArticleTextRight(props: Props) {
	const { size = 'sm', data } = props;

	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	const classNameShadowDefault = useAppSelector(state => state.app.classNameShadowDefault);
	const classNameBoxWidgetDefault = useAppSelector(state => state.app.classNameBoxWidgetDefault);

	const urlPost = formatSlugForPost(data.slug);
	return (
		<div className="w-full flex flex-wrap md:flex-nowrap gap-4">
			<div className="post relative flex-none w-full md:w-64 h-52 ">
				{/* <span className="post-format-sm">
						<i className="icon-picture" />
					</span> */}

				<Link href={urlPost}>
					<a>
						<div className="skeleton-bg relative w-full h-full  rounded-lg overflow-hidden">
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
							{/* <a className="py-1 px-2 bg-primary inline-block rounded-btn text-gray-100 font-medium"> */}

							<a className="badge badge-primary bg-primary text-white inline-block rounded-btn font-medium">
								{data.category.categoryName}
							</a>
						</Link>
					</div>
				)}
				<h2 className="text-xl">
					<Link href={urlPost}>
						<a className="line-clamp-3">{data.postName}</a>
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
				{/* <div className="post-bottom clearfix d-flex align-items-center">
					<div className="social-share me-auto">
						<button className="toggle-button icon-share" />
						<ul className="icons list-unstyled list-inline mb-0">
							<li className="list-inline-item">
								<a href="#">
									<i className="fab fa-facebook-f" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="#">
									<i className="fab fa-twitter" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="#">
									<i className="fab fa-linkedin-in" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="#">
									<i className="fab fa-pinterest" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="#">
									<i className="fab fa-telegram-plane" />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="#">
									<i className="far fa-envelope" />
								</a>
							</li>
						</ul>
					</div>
					<div className="more-button float-end">
						<a href="#">
							<span className="icon-options" />
						</a>
					</div>
				</div> */}
			</div>
		</div>
	);
}
