import { formatSlugForCategory, formatSlugForTag } from '@src/helper/formatHelper';
import { useAppSelector } from '@src/hooks/reduxHook';
import { categoryCountPostInterface } from '@src/interfaceGlobal';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

interface Props {
	arrayLink?: {
		text: string;
		slug: string;
	}[];
	type: 'category' | 'tags';
}

export default function FlexLayout(props: Props) {
	const { arrayLink, type } = props;
	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	return (
		<div className="w-full my-12">
			<ul className="m-0 p-0 flex flex-wrap items-center justify-center gap-8 md:gap-16 list-none">
				{arrayLink?.map((item, key) => (
					<li key={key} className="w-[calc(50%-1rem)] md:w-[calc(33.33333%-3rem)]">
						<Link
							href={
								type === 'category'
									? formatSlugForCategory(item.slug)
									: formatSlugForTag(item.slug)
							}>
							<a
								className={classNames(
									'btn-link flex items-center justify-center w-full h-28 shadow-sm border-solid border border-gray-200 hover:bg-gray-200 transition-all text-lg text-center',
									classNameRounedDefault
								)}>
								{item.text}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
