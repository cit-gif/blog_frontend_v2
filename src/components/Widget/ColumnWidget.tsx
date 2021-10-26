import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
	children?: ReactNode;

	title?: string;
	moreTitle?: string;
	href?: string;
}
export default function ColumnWidget(props: Props) {
	const { title, moreTitle } = props;
	return (
		<div className="w-full mb-4">
			<div className="widget-title-wrapper w-full flex items-center justify-between mb-4">
				<h2 className="widget-title text-lg font-bold">{title}</h2>
				{moreTitle && (
					<Link href={props.href || '/'}>
						<a title={moreTitle}>Xem thêm</a>
					</Link>
				)}
			</div>
			{props.children}

			<style jsx global>
				{`
					.widget-title-wrapper {
						border-bottom: 2px solid var(--rs-navbar-inverse-bg);
					}
					.widget-title {
						position: relative;
						float: left;
						height: 32px;
						// text-transform: uppercase;
						// font-weight: 600;
						line-height: 32px;
						padding: 0 15px;
						margin: 0;
						background-color: var(--rs-navbar-inverse-bg);
						color: var(--rs-navbar-inverse-text);
					}
					.widget-title:after {
						position: absolute;
						content: '';
						height: 0;
						width: 0;
						bottom: 0;
						right: -16px;
						border: 0;
						border-top: 32px solid transparent;
						border-left: 16px solid var(--rs-navbar-inverse-bg);
						margin: 0;
					}
				`}
			</style>
		</div>
	);
}
