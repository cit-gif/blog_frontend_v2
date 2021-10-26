import React, { useEffect } from 'react';

export default function CommentFB() {
	useEffect(() => {
		const scriptFBComment = document.createElement('script');
		scriptFBComment.async = true;
		scriptFBComment.defer = true;
		scriptFBComment.crossOrigin = 'anonymous';
		scriptFBComment.nonce = 'rcx80G4R';

		scriptFBComment.src =
			'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=211861074210282&autoLogAppEvents=1';
		document.body.append(scriptFBComment);
		return () => {
			document.removeChild(scriptFBComment);
		};
	}, []);
	return (
		<div className="my-4">
			<div
				className="fb-comments"
				data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
				data-width="100%"
				data-lazy="lazy"
				data-numposts="5"></div>
		</div>
	);
}
