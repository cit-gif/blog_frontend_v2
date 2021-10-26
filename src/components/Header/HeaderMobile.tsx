import { useAppContext } from '@src/contexts/AppContext';
import Divider from '@src/components/Divider';
import { formatSlugForCategory } from '@src/helper/formatHelper';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import classNames from 'classnames';
import React from 'react';
// import { IconButton, Nav, Sidenav } from 'rsuite';
import { MyHiMenu, MyIoIosClose } from '../icons';
import Link from 'next/link';
import { appReducerActions } from '@src/app/appSlice';
interface Props {
	show: boolean;
	onClose: () => void;
}

export default function HeaderMobile() {
	// const { show, onClose } = props;
	const showMenuMobile = useAppSelector(state => state.app.showMenuMobile);
	const classNameLinkHeaderDefault = useAppSelector(state => state.app.classNameLinkHeaderDefault);
	const dispatch = useAppDispatch();
	const handleCloseMenu = () => {
		dispatch(appReducerActions.setShowMenuMobile(false));
	};
	const classNameFontSizeIconDefault = useAppSelector(state => state.app.classNameFontSizeIconDefault);
	const { featuredCategories, countPostsInCategory, getMoreCategory } = useAppContext();
	return (
		<>
			<div
				onClick={handleCloseMenu}
				className={classNames(
					'bg-base-100 transition-all duration-300 ease-in-out fixed inset-0 z-40',
					{
						'opacity-0 invisible': !showMenuMobile,
						'opacity-1 visible bg-opacity-60': showMenuMobile,
					}
				)}></div>
			<div
				className={classNames(
					'w-[300px] p-6 fixed inset-y-0 right-0 z-40 transition-all duration-300 ease-in-out bg-base-100 overflow-y-auto overflow-x-hidden',
					{
						'translate-x-0 shadow-xl': showMenuMobile,
						'translate-x-full shadow-none': !showMenuMobile,
					}
				)}>
				<div className="w-full flex justify-end">
					<button
						onClick={handleCloseMenu}
						className="btn btn-ghost btn-square text-4xl"
						aria-label="Đóng menu">
						{/* <MyIoIosClose className={classNameFontSizeIconDefault} /> */}
						<MyIoIosClose />
					</button>
				</div>

				<ul className="m-0 p-0">
					<li onClick={handleCloseMenu}>
						<Link href="/">
							<a className={classNames(classNameLinkHeaderDefault, 'w-full justify-start')}>
								Trang chủ
							</a>
						</Link>
						<Divider />
					</li>

					{countPostsInCategory.map((item, key) => (
						<li onClick={handleCloseMenu} key={key}>
							<Link href={formatSlugForCategory(item.slug)}>
								<a
									className={classNames(
										classNameLinkHeaderDefault,
										'w-full justify-start'
									)}>
									{item.categoryName}
								</a>
							</Link>
							<Divider />
						</li>
					))}
				</ul>
			</div>
		</>
	);
	// return (
	// 	<DrawerSSR show={show} size="max-w-xs" onClose={onClose}>
	// 		{/* <Sidenav appearance="inverse" defaultOpenKeys={['2']}>
	// 			<Sidenav.Body>
	// 				<Nav>
	// 					{countPostsInCategory.map((item, key) => (
	// 						<Nav.Item
	// 							eventKey={(key + 1).toString()}
	// 							key={key}
	// 							as={MyLink}
	// 							href={formatSlugForCategory(item.slug)}>
	// 							{item.categoryName}
	// 						</Nav.Item>
	// 					))} */}

	// 		{/* <Dropdown
	// 						eventKey="2"
	// 						renderToggle={(props, ref) => {
	// 							return (
	// 								<Button
	// 									{...props}
	// 									ref={ref}
	// 									circle
	// 									color="blue"
	// 									appearance="primary"
	// 								/>
	// 							);
	// 						}}>
	// 						{moreCategory.map((item, key) => (
	// 							<Dropdown.Item
	// 								eventKey={'2-' + (key + 1).toString()}
	// 								key={key}
	// 								as={MyLink}
	// 								href={formatSlugForCategory(item.slug)}>
	// 								{item.categoryName}
	// 							</Dropdown.Item>
	// 						))}
	// 					</Dropdown> */}
	// 		{/* </Nav>
	// 			</Sidenav.Body>
	// 		</Sidenav> */}
	// 	</DrawerSSR>
	// );
}

// control ToggleMenuMobile
