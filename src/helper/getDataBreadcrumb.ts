import { urlByPost, urlBySearch } from '@src/config/constrant';
import { breadcrumbInterface } from '@src/interfaceGlobal';

export const getBreadcrumbForPost = (data: breadcrumbInterface): breadcrumbInterface[] => {
	if (urlByPost !== '')
		return [
			{ label: 'Bài viết', href: `/${urlByPost}?page=1` },
			{ label: data.label, href: `/${urlByPost}/${data.href}` },
		];
	return [{ label: data.label, href: `/${data.href}` }];
};
export const getBreadcrumbForSearch = (data: {
	label: string;
	query: {
		q: string;
		page: number;
	};
}): breadcrumbInterface[] => {
	return [{ label: 'Tìm kiếm', href: `/${urlBySearch}?q=${data.query.q}&&page=${data.query.page}` }];
};
