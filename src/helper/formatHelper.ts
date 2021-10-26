import {
	endUrlSlug,
	httpUrl,
	_httpUrl,
	serverApi,
	urlByAuthor,
	urlByCategory,
	urlByPage,
	urlByPost,
	urlByTag,
} from '@src/config/constrant';
/**
 * format cho url
 */
const queryPage = '?page=1';

export const formatSlugForCategory = (slug: string) => {
	if (urlByCategory !== '') return `/${urlByCategory}/${slug}${queryPage}`;
	return `/${slug}${queryPage}`;
};

export const formatSlugForPost = (slug: string) => {
	if (urlByPost !== '') return `/${urlByPost}/${slug}${endUrlSlug}`;
	return `/${slug}${endUrlSlug}`;
};
export const formatSlugForPage = (slug: string) => {
	if (urlByPage !== '') return `/${urlByPage}/${slug}${endUrlSlug}`;
	return `/${slug}${endUrlSlug}`;
};
export const formatSlugForTag = (slug: string) => {
	if (urlByTag !== '') return `/${urlByTag}/${slug}${queryPage}`;
	return `/${slug}${queryPage}`;
};
export const formatSlugForAuthor = (slug: string) => {
	if (urlByAuthor !== '') return `/${urlByAuthor}/${slug}${endUrlSlug}`;
	return `/${slug}${endUrlSlug}`;
};
export const formatUrlForImage = (urlImage: string) => {
	return `${_httpUrl}${urlImage}`;
};

//
export const formatTextReadMoreHelper = (str = '', sliceNum = 21) => {
	const stringLength = str.split(' ').length;
	const arrayFromString = str.split(' ').slice(0, sliceNum);
	const stringResult = arrayFromString.join(' ');
	if (stringLength < sliceNum) {
		return stringResult;
	}
	return stringResult + '...';
};
export function formatUrlImage(url: string) {
	// return `${httpUrl}_next/image?url=${serverApi}${url}&w=1920&q=100`;
	return `${httpUrl}${url}`;
}
export function formatDateHelper(DateTime: string) {
	const date = new Date(DateTime);
	return date
		.toLocaleString('vi', {
			// weekday: 'long', // long, short, narrow
			day: 'numeric', // numeric, 2-digit
			year: 'numeric', // numeric, 2-digit
			month: '2-digit', // numeric, 2-digit, long, short, narrow
			//hour: "numeric", // numeric, 2-digit
			//minute: "numeric", // numeric, 2-digit
			//second: 'numeric', // numeric, 2-digit
		})
		.split(', ')
		.reverse()
		.join(' ');
}
export function formatUrlVideo(url: string) {
	let result = '';
	result = url.replace('watch?v=', 'embed/');
	return result;
}
