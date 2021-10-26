import { DefaultSeoProps, NextSeo, DefaultSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
const title = '500 - Lỗi máy chủ';
export default function NotFoundPage() {
	return (
		<div className="w-full py-32 flex flex-col gap-4 items-center justify-center">
			<NextSeo title={title} />
			<h2 className="text-6xl">500</h2>
			<span className="text-2xl">{title}</span>
			<Link href="/">
				<a>Trở về trang chủ</a>
			</Link>
		</div>
	);
}
NotFoundPage.getLayout = (page: any) => page;
