import { useMutation } from '@apollo/client';
import { gqlUpdateLikesForPost } from '@src/apollo-client/gql';
import React, { useEffect, useState } from 'react';
import { MyLikeIcon, MyOutlineDislike } from '../icons';
interface Props {
	id: string;
}
export default function RatePost(props: Props) {
	const [update] = useMutation(gqlUpdateLikesForPost, {
		variables: { id: props.id },
	});
	const [disableButton, setDisable] = useState(false);
	const handleRate = () => {
		setDisable(true);
		update();
	};
	return (
		<div className="flex gap-4 justify-center items-center my-8">
			{!disableButton ? (
				<>
					<span className="font-semibold">Bài viết này có hữu ích không?</span>
					<button
						disabled={disableButton}
						onClick={handleRate}
						className="btn btn-primary btn-outline"
						aria-label="Đánh giá bài viết">
						<MyLikeIcon />
					</button>
				</>
			) : (
				<span>Cảm ơn bạn đã đánh giá</span>
			)}
		</div>
	);
}
