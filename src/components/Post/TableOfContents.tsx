import classNames from 'classnames';
import Scrollspy from 'react-scrollspy';
// import { IconButton, Panel, PanelGroup } from 'rsuite';
import React, { useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { MyAiOutlineUnorderedList, MyIoIosArrowDown } from '../icons';
import { IoIosClose } from 'react-icons/io';
import { useAppSelector } from '@src/hooks/reduxHook';
interface Props {
	tocListId: string[];
	tocELements: React.ReactNodeArray;
}
export default function TableOfContents(props: Props) {
	const [openToc, setOpenToc] = React.useState(false);
	// const elementRef = React.useRef(null);
	// const headerHeight = useAppSelector(state => state.app.headerHeight);
	// const { inViewport } = useInViewport(elementRef, {}, { disconnectOnLeave: false }, {});
	// const showTocModal = React.useState();
	// const style = !inViewport ? { top: headerHeight + 'px' } : {};
	return (
		<>
			<div
				// ref={elementRef}
				tabIndex={0}
				className={classNames(
					'collapse collapse-arrow w-full md:w-80 my-8 border rounded-box border-base-300',
					{
						'collapse-open': openToc,
						'collapse-close': !openToc,
					}
				)}>
				<div
					onClick={() => setOpenToc(!openToc)}
					className="cursor-pointer collapse-title text-xl font-medium">
					<div className="flex items-center gap-2">
						<span>
							<MyAiOutlineUnorderedList />
						</span>
						<span>Nội dung chính</span>
					</div>
				</div>
				<div className="collapse-content">
					{/* react-scrollspy */}
					{/* <Scrollspy
						items={props.tocListId}
						currentClassName="bg-gray-400 bg-opacity-20"
						className="">
						{props.tocELements}
					</Scrollspy> */}

					<ul className="text-lg flex flex-col gap-y-2">{props.tocELements}</ul>
				</div>
			</div>
		</>
	);
}
