/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';

import { postDetailsInterface } from '../../interfaceGlobal';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import Image from 'next/image';
import { serverApi } from '@src/config';
import TableOfContents from './TableOfContents';
import InforPost from './InforPost';
import TagsAndSharePost from './TagsAndSharePost';
import RatePost from './RatePost';
import RelatedPosts from './RelatedPosts';
import CommentFB from './CommentFB';
// import SlideImage from './SlideImage';
import { useAppDispatch } from '@src/hooks/reduxHook';
import { postReducerActions } from '@src/PostSliceReducer';
import dynamic from 'next/dynamic';
import { formatSlugForCategory, formatUrlVideo } from '@src/helper/formatHelper';
import { httpUrl } from '@src/config/constrant';
// import TableOfContentsOnlyCLient from '@src/helper/TocPost';
import Link from 'next/link';
import Box from '../Box';
const SlideImage = dynamic(() => import('./SlideImage'), { ssr: false });

interface Props {
	data: postDetailsInterface;
	relatedPosts: any;
}

export default function PostDetailsComponent(props: Props) {
	const { data, relatedPosts } = props;
	const dispatch = useAppDispatch();
	/**
	 *  tao mục lục cho bài viết nếu sủ các heading
	 */
	const tocELements: React.ReactNodeArray = []; // array elemt để hiển thị
	let tocInitId = 0; // số thứ tự id
	const tocListId: string[] = []; // list của id để truyền vào Scrollspy

	let arrayImageInPost: string[] = [];
	const optionsReplaceHtmlToReact = {
		replace: (domNode: any) => {
			// tạo mục lục
			if ('h1 h2 h3 h4 h5'.includes(domNode.name)) {
				const tocItemId = 'toc-item-id-' + tocInitId;
				tocListId.push(tocItemId);
				tocInitId++;
				tocELements.push(
					<li key={tocItemId}>
						<a href={'#' + tocItemId}>
							{domToReact(domNode.children, optionsReplaceHtmlToReact)}
						</a>
					</li>
				);
				if (domNode.name === 'h1') {
					/**
					 * trên bài viết chỉ nên có 1 thẻ h1
					 */

					return <h2 id={tocItemId}>{domToReact(domNode.children, optionsReplaceHtmlToReact)}</h2>;
				}
				// eslint-disable-next-line react/no-children-prop
				return React.createElement(
					domNode.name,
					{ id: tocItemId },
					domToReact(domNode.children, optionsReplaceHtmlToReact)
				);
			} //kết thúc tạo mục lục

			/**
			 * iframe youtube
			 */
			if (domNode.name === 'oembed') {
				const propsElement: any = attributesToProps(domNode.attribs);
				/**
				 * chuyển url thành ebmed
				 *
				 */
				const srcVideo = formatUrlVideo(propsElement.url);
				return (
					<iframe
						title={srcVideo}
						loading="lazy"
						className="w-full max-w-[700px] h-96"
						src={srcVideo}
						allowFullScreen></iframe>
				);
			}
			if (domNode.name === 'figure' && domNode.attribs?.class?.includes('image')) {
				/**
				 *  fix css cho giống bên editor
				 */
				const propsElement: any = attributesToProps(domNode.attribs);
				/**
				 * css width resize
				 */

				return (
					<figure
						{...propsElement}
						style={{
							width: propsElement?.style?.width ? propsElement.style.width : '100%',
							maxWidth: '100%',
						}}
						className={propsElement.className + 'block'}>
						{domToReact(domNode.children, optionsReplaceHtmlToReact)}
					</figure>
				);
			}
			if (domNode.name === 'figcaption') {
				/**
				 *  custom
				 * caption cho imgae
				 */
				const propsElement: any = attributesToProps(domNode.attribs);
				return (
					<figcaption
						{...propsElement}
						className="w-full text-center font-light text-sm italic py-2">
						{domToReact(domNode.children, optionsReplaceHtmlToReact)}
					</figcaption>
				);
			}
			if (domNode.name === 'img') {
				/**
				 * image
				 * nếu là từ thư mục uploads thì chuyển thành next image
				 * còn không thì push vào mảng array slide
				 */
				const arrayImageInPostLenght = arrayImageInPost.length;
				const handleClick = () => {
					dispatch(postReducerActions.setIndexImage(arrayImageInPostLenght));
					dispatch(postReducerActions.setIsOpen(true));
				};
				if (domNode.attribs?.src?.startsWith('/uploads')) {
					const srcImage = `${httpUrl}${domNode.attribs.src}`;
					arrayImageInPost.push(srcImage);
					return (
						<div className="w-full relative">
							<Image
								onClick={handleClick}
								src={srcImage}
								objectFit="contain"
								objectPosition="center"
								width="1000"
								height={600}
								layout="responsive"
								alt={domNode.attribs.alt}
								loading="lazy"
							/>
						</div>
					);
				} else {
					const propsElement: any = attributesToProps(domNode.attribs);
					arrayImageInPost.push(domNode.attribs.src);
					// eslint-disable-next-line jsx-a11y/alt-text
					return (
						// eslint-disable-next-line jsx-a11y/alt-text
						<img
							{...propsElement}
							style={{ ...propsElement?.style, width: '100%' }}
							onClick={handleClick}
							loading="lazy"
							decoding="async"
							className="w-full object-cover"
							alt={domNode.attribs.alt}
						/>
					);
				}
			}
			if (domNode.name === 'figure' && domNode?.attribs?.class === 'table') {
				/**
				 * fix css cho table khi quá dài sẽ bị tràn
				 */
				return (
					<figure className="my-4 overflow-x-auto">
						{domToReact(domNode.children, optionsReplaceHtmlToReact)}
					</figure>
				);
			}
			if (domNode.name === 'table') {
				/**
				 * làm đẹp cho table .
				 * sử dụng plugins table của tailwindcss
				 * có các class-table của boostrap
				 */
				return (
					<table className="table table-hover table-bordered" style={{ background: 'transparent' }}>
						{domToReact(domNode.children, optionsReplaceHtmlToReact)}
					</table>
				);
			}
		},
	};
	const postContent = parse(data.content, optionsReplaceHtmlToReact);
	useEffect(() => {
		dispatch(postReducerActions.setArrayUrlImg(arrayImageInPost));
	}, [arrayImageInPost]);
	// useEffect(() => {
	// 	new TableOfContentsOnlyCLient({
	// 		from: document.querySelector('.article'),
	// 		to: document.querySelector('.table-of-contents'),
	// 	}).generateToc();
	// }, []);
	return (
		<div className="w-full antialiased sm:subpixel-antialiased md:antialiased ">
			{data?.category?.categoryName && (
				<Link href={formatSlugForCategory(data.category.slug)}>
					<a className="btn btn-sm btn-primary normal-case font-medium">
						{data?.category?.categoryName}
					</a>
				</Link>
			)}

			<article className="content-editor">
				<h1 className="my-8 text-3xl md:text-4xl">{data.postName}</h1>
				<InforPost data={data} />
				{/* <div className="table-of-contents"></div> */}
				{tocELements.length !== 0 && (
					<TableOfContents tocELements={tocELements} tocListId={tocListId} />
				)}
				<div id="content">{postContent}</div>
			</article>
			<RatePost id={data.id} />

			<TagsAndSharePost data={data.tags} />
			<RelatedPosts postDetailsId={data.id} relatedPosts={relatedPosts[0]} />

			<SlideImage />

			{/* comment facebook */}
			<CommentFB />
		</div>
	);
}
