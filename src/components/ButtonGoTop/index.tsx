import smoothScrollBackToTop from '@src/helper/scrollToTop';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import { IconButton } from 'rsuite';
import { MyAiOutlineArrowUp, MyIoIosArrowUp } from '../icons';

export default function ButtonGoTop() {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			const intance = 100;
			if (document.body.scrollTop > intance || document.documentElement.scrollTop > intance) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			className={classNames('fixed z-10 right-2 transition-transform ease-in-out bottom-4 transform', {
				'invisible opacity-0 translate-y-6': !show,
				'visible opacity-1 translate-y-0': show,
			})}>
			<button
				onClick={smoothScrollBackToTop}
				aria-label="Lên đầu trang"
				className="btn btn-outline shadow-sm btn-circle btn-sm normal-case font-medium gap-2">
				<MyAiOutlineArrowUp />
			</button>
		</div>
	);
}
