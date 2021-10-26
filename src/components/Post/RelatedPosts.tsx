import { formatSlugForPost } from '@src/helper/formatHelper';
import Link from 'next/link';
import React from 'react';
interface Props {
	postDetailsId: string; // không đề xuất bài viết đang đọc
	relatedPosts?: {
		posts: {
			id: string;
			postName: string;
			slug: string;
		}[];
	};
}
export default function RelatedPosts(props: Props) {
	const { relatedPosts, postDetailsId } = props;
	if (relatedPosts && relatedPosts?.posts?.length !== 0) {
		return (
			<div>
				<span className="text-base font-semibold">Bài viết liên quan:</span>
				<ul className="my-4 list-disc">
					{relatedPosts.posts.map((item, key) => {
						if (item.id === postDetailsId) {
							return null;
						}
						return (
							<li key={key} className="mt-1 text-lg font-medium">
								<Link href={formatSlugForPost(item.slug)}>
									<a className="link link-primary">{item.postName}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	return null;
}
