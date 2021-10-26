import { GetServerSidePropsContext } from 'next';
export const countStart = (limit: number, page: number) => limit * (page - 1);
export const getQuerySearch = (context: GetServerSidePropsContext, limit = 20) => {
	let searchString = '';
	let page = 1;
	if (!isNaN(context.query.page as any)) {
		const pageToInt = parseInt(context.query.page as any);
		if (pageToInt >= 1 && pageToInt <= 200) {
			page = pageToInt;
		}
	}
	if (context.query.q) {
		searchString = context.query.q as string;
	}
	const start = countStart(limit, page);
	return {
		searchString,
		page,
		limit,
		start,
	};
};
