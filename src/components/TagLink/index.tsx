import { formatSlugForTag } from '@src/helper/formatHelper';
import Link from 'next/link';
import React from 'react';
interface Props {
	data: {
		slug: string;
		name: string;
	};
}
export default function TagLink(props: Props) {
	const { data } = props;
	return (
		<Link href={formatSlugForTag(data.slug)}>
			<a
				title={data.name}
				className="rounded-box text-sm p-2 border text-base-content hover:text-white hover:bg-primary transition-all">
				# {data.name}
			</a>
		</Link>
	);
}
