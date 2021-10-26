import { breadcrumbInterface } from '@src/interfaceGlobal';
import React from 'react';
import { MyIosArrowForward } from '../icons';
import Link from 'next/link';
interface Props {
	data: breadcrumbInterface[];
}
export default function MyBreadcrumb(props: Props) {
	const { data } = props;
	const lengthOfData = data.length;
	return (
		<div className="w-full breadcrumbs text-primary-focus">
			<ul>
				<li>
					<Link href="/">
						<a>Trang chủ</a>
					</Link>
				</li>
				{data.map((item, key) => {
					if (key === lengthOfData - 1) {
						{
							/* active*/
						}
						return (
							<li key={key}>
								<span className="text-base-content text-opacity-90" title={item.label}>
									{item.label}
								</span>
							</li>
						);
					}
					return (
						<li key={key}>
							<Link href={item.href}>
								<a className="btn-link text-primary-focus" title={item.label}>
									{item.label}
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
