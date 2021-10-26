import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import React from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/reduxHook';
import { postReducerActions } from '@src/PostSliceReducer';

export default function SlideImage() {
	const images = useAppSelector(state => state.post.arrayUrlImg);
	const photoIndex = useAppSelector(state => state.post.indexImage);
	const isOpen = useAppSelector(state => state.post.isOpen);
	const dispatch = useAppDispatch();
	const imagesLength = images.length;
	return (
		<>
			{isOpen && imagesLength !== 0 && (
				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % imagesLength]}
					prevSrc={images[(photoIndex + imagesLength - 1) % imagesLength]}
					onCloseRequest={() => dispatch(postReducerActions.setIsOpen(false))}
					onMovePrevRequest={() =>
						dispatch(
							postReducerActions.setIndexImage(
								(photoIndex + imagesLength - 1) % imagesLength
							)
						)
					}
					onMoveNextRequest={() =>
						dispatch(
							postReducerActions.setIndexImage(
								(photoIndex + imagesLength + 1) % imagesLength
							)
						)
					}
				/>
			)}
		</>
	);
}
