import { postInterface } from '@src/interfaceGlobal';
import React, { useEffect, useState } from 'react';

import TitleCate from '../TitleCate';
import NotFoundArticle from './NotFoundArticle';
import WidgetArticleTextInnerSmall from './WidgetArticleTextInnerSmall';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Controller } from 'swiper';
import { MyIoIosArrowBack, MyIosArrowForward } from '../icons';
import classNames from 'classnames';
SwiperCore.use([Autoplay, Controller]);

interface Props {
	data?: {
		category: {
			categoryName: string;
			id: string;
			slug: string;
			posts: postInterface[];
		};
	};
}
export default function LayoutWidgetPostSlide(props: Props) {
	const { data } = props;

	/**
	 * kiểm tra button next và prev có disabled hay không
	 * chỉ áp dụng cho slide không có vòng lặp
	 */
	const [buttonNextPrev, setButtonNextPrev] = useState({
		next: false,
		prev: true,
	});

	const [controllerSwiper, setControllerSwiper] = useState<any>(null);
	const handleChange = (swiper: SwiperCore) => {
		if (!swiper) return;
		//check disabled
		if (swiper.isEnd) {
			setButtonNextPrev(prev => ({ ...prev, next: true }));
		} else {
			setButtonNextPrev(prev => ({ ...prev, next: false }));
		}
		if (swiper.activeIndex === 0) {
			setButtonNextPrev(prev => ({ ...prev, prev: true }));
		} else {
			setButtonNextPrev(prev => ({ ...prev, prev: false }));
		}
	};
	if (!props.data || props?.data?.category?.posts?.length === 0) {
		return <NotFoundArticle />;
	}

	return (
		<div className="w-full">
			<div className="flex justify-between">
				<TitleCate title={data?.category.categoryName || ''} />
				<div className="flex gap-2">
					<button
						disabled={buttonNextPrev.prev}
						onClick={() => {
							controllerSwiper.slidePrev();
						}}
						aria-label="change swiper"
						className={classNames('btn btn-sm btn-circle text-base', {
							'btn-disabled': buttonNextPrev.prev,
							'btn-primary': !buttonNextPrev.prev,
						})}>
						<MyIoIosArrowBack />
					</button>
					<button
						disabled={buttonNextPrev.next}
						onClick={() => {
							controllerSwiper.slideNext();
						}}
						aria-label="change swiper"
						className={classNames('btn btn-sm btn-circle text-base', {
							'btn-disabled': buttonNextPrev.next,
							'btn-primary': !buttonNextPrev.next,
						})}>
						<MyIosArrowForward />
					</button>
				</div>
			</div>
			<Swiper
				// spaceBetween={10}
				// slidesPerView={2}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				onSwiper={setControllerSwiper}
				onInit={handleChange}
				onSlideChange={handleChange}
				onUpdate={handleChange}
				controller={{ control: controllerSwiper }}
				breakpoints={{
					'640': {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					'768': {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					'1024': {
						slidesPerView: 2,
						spaceBetween: 10,
					},
				}}>
				{data?.category.posts.map((item, key) => {
					return (
						<SwiperSlide key={key}>
							<div>
								<WidgetArticleTextInnerSmall data={item} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
}
