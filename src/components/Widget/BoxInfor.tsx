import React, { ReactNode } from 'react';
interface Props {
	children: ReactNode;
}
export default function BoxInfor(props: Props) {
	return (
		<div
			className="absolute bottom-0 left-0 right-0 overflow-hidden bg-gradient-to-b from-transparent to-black p-2"
			style={{ textShadow: '0 1px 2px rgb(0 0 0 / 50%)' }}>
			{props.children}
		</div>
	);
}
