import { useAppContext } from '@src/contexts/AppContext';
import { formatUrlVideo } from '@src/helper/formatHelper';
import React from 'react';

export default function VideosAside() {
	const { recommendedVideos } = useAppContext();
	// return null;
	return (
		<ul className="list-none p-0 flex flex-col gap-y-4">
			{recommendedVideos.map((item, key) => (
				<li className="aspect-w-16 aspect-h-9" key={key}>
					<iframe
						title={item.url}
						loading="lazy"
						width="100%"
						height="100%"
						src={formatUrlVideo(item.url)}
						allowFullScreen></iframe>
				</li>
			))}
		</ul>
	);
}
