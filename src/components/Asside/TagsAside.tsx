import React from 'react';
import { useAppContext } from '@src/contexts/AppContext';
import TagLink from '../TagLink';

export default function TagsAside() {
	const { dataTags } = useAppContext();
	return (
		<ul className="list-none p-0 flex flex-wrap gap-1">
			{dataTags?.map((tag, key) => (
				<li key={tag.id}>
					<TagLink data={{ slug: tag.slug, name: tag.name }} />
				</li>
			))}
		</ul>
	);
}
