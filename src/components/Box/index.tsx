import React from 'react';
interface Props {
	children: React.ReactNode | React.ReactNodeArray;
}
export default function Box(props: Props) {
	return <div className="rounded-lg border border-solid border-gray-200 p-6">{props.children}</div>;
}
