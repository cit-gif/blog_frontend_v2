import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@src/hooks/reduxHook';
import classNames from 'classnames';
import { categoryCountPostInterface } from '@src/interfaceGlobal';
import { formatSlugForCategory } from '@src/helper/formatHelper';
import { useAppContext } from '@src/contexts/AppContext';
interface CategoryItemInterface {
	data: categoryCountPostInterface;
}
const CategoryItem = (props: CategoryItemInterface) => {
	const { data } = props;
	const classNameRounedDefault = useAppSelector(state => state.app.classNameRounedDefault);
	return (
		<li
			className={classNames(
				classNameRounedDefault,
				'transition-all py-2 hover:bg-neutral-content hover:text-neutral'
			)}>
			<Link href={formatSlugForCategory(data.slug)}>
				<a className="w-full flex items-center justify-between px-2 text-primary">
					<span>{data.categoryName}</span>
					<span>({data.countPosts})</span>
				</a>
			</Link>
		</li>
	);
	/**
	 * nếu mún hiển thị hình ảnh
	 */
	return (
		<li className={classNames('overflow-hidden relative category-box-out-size', classNameRounedDefault)}>
			<Link href={formatSlugForCategory(data.slug)}>
				<a className="relative block transition-all">
					<div className="relative w-full h-20">
						<Image
							src="/"
							objectFit="cover"
							objectPosition="center"
							alt=""
							layout="fill"
							loading="lazy"
						/>
					</div>
					<div className="absolute inset-0 backdrop-brightness-50 bg-gray-800 bg-opacity-40 flex items-center justify-around gap-2 px-2 text-gray-100">
						<span className="font-semibold">{data.categoryName}</span>
						<span className="border border-dashed border-gray-400 flex-1 max-w-[40%]"></span>
						<span className="rounded-full w-12 h-12 bg-gray-100 text-gray-800 font-bold flex items-center justify-center">
							{data.countPosts}
						</span>
					</div>
				</a>
			</Link>
		</li>
	);
};

export default function Categorys() {
	const { countPostsInCategory } = useAppContext();
	return (
		<ul className="flex flex-col list-none p-0">
			{countPostsInCategory.map((item, key) => (
				<CategoryItem data={item} key={key} />
			))}
		</ul>
	);
}
