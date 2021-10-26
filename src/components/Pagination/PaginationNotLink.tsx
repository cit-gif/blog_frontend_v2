import React, { useState } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

import { useRouter } from 'next/router';
import { MyIoIosArrowBack } from '../icons';
import { IoIosArrowForward } from 'react-icons/io';
interface Props {
	totalCount: number;
	siblingCount?: number;
	currentPage: any;
	pageSize: number;
	className: string;
	queryKey?: string;
	url: string;
	urlForChange?: string;

	handler?: (page: number) => Promise<void>;
}
const PaginationNotLink = (props: Props) => {
	const {
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
		queryKey = 'page',
		url,
		urlForChange,
		handler = async page => {},
	} = props;
	const router = useRouter();

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});
	const [stateCurrentPage, setStateCurrentPage] = useState(currentPage);

	if (!paginationRange) {
		return null;
	}
	const getUrl = (page: any) => {
		return url + page;
	};
	const handleChange = async (page: any) => {
		await handler(page);
		const urlSearchParams = new URLSearchParams(window.location.search);
		const query = Object.fromEntries(urlSearchParams.entries());
		setStateCurrentPage(page);
		// bởi vì router.pathname  của trang có params nó sẽ khác
		// trang không có ;
		//ví dụ : của danh mục => /danh-muc/[slug]/
		if (urlForChange) {
			router.push(urlForChange + page, undefined, { shallow: true });
		} else {
			router.push(router.pathname, { query: { ...query, [queryKey]: page } }, { shallow: true });
		}
	};
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}
	const disabled_next_prev = 'text-gray-300 border-2 border-gray-700 border-soild';
	const active_next_pre = 'text-gray-700 ';
	const selected = 'bg-gray-400 shadow text-white';
	const not_selected = 'border-2 border-primary';
	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<nav className="block">
			<ul
				className={classnames('flex items-center flex-row space-x-2 text-2xl', {
					[className]: className,
				})}>
				<li className="inline-block cursor-pointer">
					<a
						href={currentPage > 1 ? getUrl(parseInt(currentPage) - 1) : '#'}
						onClick={e => {
							if (currentPage === 1) {
								return e.preventDefault();
							}
							handleChange(currentPage - 1);
						}}
						className={classnames(
							'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative',
							{
								[disabled_next_prev]: currentPage === 1,
								[active_next_pre]: currentPage !== 1,
							}
						)}>
						<MyIoIosArrowBack />
					</a>
				</li>
				{paginationRange.map((pageNumber, key) => {
					if (pageNumber === DOTS) {
						return (
							<li className="inline-block cursor-pointer" key={key}>
								<a
									href="#"
									onClick={e => e.preventDefault()}
									className={classnames(
										'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative ',
										{
											not_selected: true,
										}
									)}>
									&#8230;
								</a>
							</li>
						);
					}

					return (
						<li className="inline-block cursor-pointer" key={key}>
							<a
								href={getUrl(pageNumber)}
								onClick={e => {
									e.preventDefault();
									handleChange(pageNumber);
								}}
								className={classnames(
									'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative',
									{
										[selected]: pageNumber == stateCurrentPage,
										[not_selected]: pageNumber != stateCurrentPage,
									}
								)}>
								{pageNumber}
							</a>
						</li>
					);
				})}
				<li className="inline-block cursor-pointer">
					<a
						href={currentPage !== lastPage ? getUrl(parseInt(currentPage) + 1) : '#'}
						onClick={e => {
							if (currentPage === lastPage) {
								return e.preventDefault();
							}
							handleChange(currentPage + 1);
						}}
						className={classnames(
							'first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative',
							{
								[disabled_next_prev]: currentPage === lastPage,
								[active_next_pre]: currentPage !== lastPage,
							}
						)}>
						<IoIosArrowForward />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default PaginationNotLink;
