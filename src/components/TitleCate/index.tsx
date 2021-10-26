import React from 'react';
interface Props {
	title: string;
}
export default function TitleCate(props: Props) {
	return <h2 className="text-2xl mb-6">{props.title}</h2>;
}
