import Search from './Search';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { appReducerActions } from '@src/app/appSlice';
import { formatSlugForCategory, formatSlugForPost } from '@src/helper/formatHelper';
import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '@src/contexts/AppContext';
import Link from 'next/link';
import { urlByPost } from '@src/config/constrant';
import { MyHiMenu, MyIoIosArrowDown } from '../icons';
import classNames from 'classnames';
import ToggleDarkMode from './ToggleDarkMode';
export default function HeaderApp() {
	const { featuredCategories, countPostsInCategory, getMoreCategory } = useAppContext();
	const showMenuMobile = useAppSelector(state => state.app.showMenuMobile);
	const classNameFontSizeIconDefault = useAppSelector(state => state.app.classNameFontSizeIconDefault);
	const classNameLinkHeaderDefault = useAppSelector(state => state.app.classNameLinkHeaderDefault);

	const { dataAppSettings } = useAppContext();
	const dispatch = useAppDispatch();

	const toggleShowMenuMobile = () => {
		dispatch(appReducerActions.setShowMenuMobile(!showMenuMobile));
	};
	const headerRef = useRef<HTMLDivElement>(null);
	const [openMenu, setOpenMenu] = useState(true);
	useEffect(() => {
		let prevScrollpos = window.pageYOffset;

		const handleScroll = (e: Event) => {
			if (!headerRef.current) return;
			const currentScrollPos = window.pageYOffset;

			if (prevScrollpos > currentScrollPos) {
				//header
				// headerRef.current.style.top = '0';
				setOpenMenu(true);
				/**
				 * do phần header fixid và aside sticky top-0
				 */
				// phần aside bên phải
				dispatch(appReducerActions.setHeaderHeight(headerRef.current.offsetHeight + 10));
			} else {
				// document.getElementById('navbar').style.top = '-50px';
				// headerRef.current.style.top = '-100%';
				setOpenMenu(false);

				dispatch(appReducerActions.setHeaderHeight(5));
			}
			if (prevScrollpos < currentScrollPos) {
			}
			prevScrollpos = currentScrollPos;
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{/* logo màn hình lớn */}
			<div className="w-full justify-center py-4 hidden md:flex">
				<Link href="/">
					<a className="text-5xl font-bold leading-snug text-primary-focus">Wiki stock</a>
				</Link>
			</div>
			<hr className="w-full" />
			<header
				ref={headerRef}
				style={{ transitionTimingFunction: 'cubic-bezier(0.3, 0.73, 0.3, 0.7)' }}
				className={classNames(
					'w-full sticky z-30 navbar  inset-x-0 transition-all ease-linear duration-300 justify-center gap-2 mb-2 shadow-lg bg-base-100',
					{
						'-top-full': !openMenu,
						'top-0': openMenu,
					}
					// 'bg-black text-white md:text-base-content md:bg-base-100 '
				)}>
				{/* logo màn hình nhỏ*/}

				<div className="flex-1 px-2 mx-2 inline-block md:hidden">
					<Link href="/">
						<a className="font-semibold text-primary-focus">Wiki stock</a>
					</Link>
				</div>
				<div className="hidden md:flex items-center lg:gap-4">
					{featuredCategories.map((item, key) => (
						<Link key={key} href={formatSlugForCategory(item.category.slug)}>
							<a className={classNames(classNameLinkHeaderDefault)}>
								{item.category.categoryName}
							</a>
						</Link>
					))}
					<div className="flex-none hidden px-2 mx-2 md:flex">
						<ul className="flex items-stretch">
							<li className="dropdown dropdown-hover dropdown-end">
								<div
									tabIndex={0}
									className={classNames(classNameLinkHeaderDefault, 'gap-2')}>
									Xem thêm <MyIoIosArrowDown />
								</div>
								<ul
									tabIndex={0}
									className="p-2 shadow-md menu dropdown-content bg-base-100 rounded-box w-52">
									<li>
										<Link href={`/${urlByPost}`}>
											<a className={classNames(classNameLinkHeaderDefault)}>
												Bài viết gần đây
											</a>
										</Link>
									</li>
									{getMoreCategory.map((item, key) => (
										<li key={key}>
											<Link href={formatSlugForCategory(item.slug)}>
												<a
													className={classNames(
														classNameLinkHeaderDefault
													)}>
													{item.categoryName}
												</a>
											</Link>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex-none">
					<ToggleDarkMode />

					<Search />
					{/* <ToggleDarkMode /> */}

					<button
						onClick={toggleShowMenuMobile}
						aria-label="Mở thanh điều hướng"
						className={classNames('btn btn-square btn-ghost', classNameFontSizeIconDefault)}>
						<MyHiMenu />
					</button>
				</div>
			</header>
		</>
	);
}
