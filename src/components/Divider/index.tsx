import React from 'react';

export default function Divider() {
	return (
		<div className="my-divider">
			<style jsx>
				{`
					.my-divider {
						display: block;
						height: 1px;
						margin: 0.5rem 0;
						width: 100%;
						background: linear-gradient(to left, #ebebeb 0%, transparent 100%);
					}
				`}
			</style>
		</div>
	);
}
