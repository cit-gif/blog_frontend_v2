import AssideApp from '@src/components/Asside';
import Box from '@src/components/Box';
import ButtonGoTop from '@src/components/ButtonGoTop';
import ContactButton from '@src/components/ContactButton';
import Divider from '@src/components/Divider';
import FooterApp from '@src/components/Footer';
import HeaderApp from '@src/components/Header';
import HeaderMobile from '@src/components/Header/HeaderMobile';
import WidgetArticleTextInner from '@src/components/Widget/WidgetArticleTextInner';
import WidgetArticleTextRightSmall from '@src/components/Widget/WidgetArticleTextRightSmall';
import WidgetHomePage from '@src/components/Widget/WidgetHomePage';
import { useAppContext } from '@src/contexts/AppContext';
import { useAppDispatch } from '@src/hooks/reduxHook';
import { dataForLayoutInterface, linkBottomInterface } from '@src/interfaceGlobal';
import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}
export default function Layout(props: Props) {
	const dispatch = useAppDispatch();
	const { dataNewestPosts } = useAppContext();

	return (
		<>
			<div className="flex flex-wrap justify-between">
				<HeaderMobile />
				<HeaderApp />
				{/* chia app bên trái w8/12 phải 4/12 gap-4 */}
				{/* w-full lg:w-[calc(66.666667%-0.5rem)] */}
				{/* w-full lg:w-[calc(33.333333%-.5rem)] */}
				<div className="flex flex-wrap gap-y-8 gap-x-8 my-8 w-full container mx-auto">
					{/* phần chỉ hiển thị trên trang chủ */}
					<WidgetHomePage />
					{/* main */}
					<main className="mx-auto w-full lg:w-[calc(66.666667%-1rem)] rounded-box">
						{props.children}
					</main>
					{/* aside */}
					<aside className="w-full lg:w-[calc(33.333333%-1rem)]">
						<AssideApp />
					</aside>
				</div>
				<FooterApp />
			</div>
			<ButtonGoTop />
			<ContactButton />
		</>
	);
	// <Container>
	// 	{/* <Header> */}
	// 	<HeaderApp />
	// 	{/* </Header> */}
	// 	<Container>
	// 		<div className="container mx-auto my-8">
	// 			<div className="flex flex-col w-full">
	// 				{/*  widget*/}
	// 				<div className="w-full">
	// 					<Widget />
	// 				</div>
	// 				<div className="w-full flex flex-col lg:flex-row  gap-8">
	// 					<main className="w-full lg:w-8/12">{props.children}</main>
	// 					<aside className="w-full lg:w-4/12">
	// 						<AssideApp />
	// 					</aside>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		{/*
	// 		fixed layout
	// 		*/}
	// 		<ButtonGoTop />
	// 		<ContactButton />
	// 	</Container>
	// 	<Footer>
	// 		<FooterApp />
	// 	</Footer>
	// </Container>
}
