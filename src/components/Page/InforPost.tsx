import { formatDateHelper } from '@src/helper/formatHelper';
import { postInterface } from '@src/interfaceGlobal';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { MyEyeIcon, MyLikeIcon, MyTimeIcon, MyUserIcon } from '../icons';
const gapCss = 'gap-2';
interface Props {
	data: postInterface;
	size?: 'lg' | 'sm';
	showDivider?: boolean;
}
export default function InforPost(props: Props) {
	const { data, size = 'lg', showDivider = true } = props;
	const dateTime = formatDateHelper(data.published_at);
	if (size == 'sm') {
		return (
			<div className="flex flex-wrap items-center text-xs md:text-sm space-x-2 my-2">
				<span className="flex items-center space-x-1">
					<MyUserIcon />
					<span>{data.author.name}</span>
					{/* <Link href="/">
							<a>{data.author.name}</a>
						</Link> */}
				</span>
				<span className="flex items-center space-x-1">
					<MyTimeIcon />
					<time dateTime={data.published_at}>{formatDateHelper(data.published_at)}</time>
				</span>
				<span className="flex items-center space-x-1">
					<MyEyeIcon />
					<span>{data.seen}</span>
				</span>
				<span className="flex items-center space-x-1">
					<MyLikeIcon />
					<span>{data.like}</span>
				</span>
			</div>
		);
	}
	return (
		<>
			<div
				className={classNames(
					'flex items-center flex-wrap gap-2 text-sm md:text-base md:gap-4 font-medium'
				)}>
				<div title={`Tác giả: ${data.author.name}`} className={classNames('flex items-center', gapCss)}>
					{/* <Avatar circle></Avatar> */}
					<span className="font-semibold">{data.author.name}</span>
					{/* <Link href="/">
						<a>{data.author.name}</a>
					</Link> */}
				</div>
				<div className={classNames('flex items-center', gapCss)}>
					<MyTimeIcon />
					<time data-time={dateTime}>{dateTime}</time>
				</div>
				<div title={`${data.seen} lượt xem`} className={classNames('flex items-center', gapCss)}>
					<MyEyeIcon />
					<span>{data.seen}</span>
				</div>
				<div title={`${data.like} lượt thích`} className={classNames('flex items-center', gapCss)}>
					<MyLikeIcon />
					<span>{data.like}</span>
				</div>
			</div>
			{/* {showDivider && <Divider />} */}
		</>
	);
}
