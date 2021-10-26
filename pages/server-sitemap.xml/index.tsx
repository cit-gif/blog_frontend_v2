import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqGetAllSlug } from '@src/apollo-client/gql';
import { urlByCategory, urlByPost, urlBySearch, urlByTag, _httpUrl } from '@src/config/constrant';
import {
	formatSlugForCategory,
	formatSlugForPage,
	formatSlugForPost,
	formatSlugForTag,
} from '@src/helper/formatHelper';
interface Item {
	slug?: string;
	url?: string;
	updatedAt: string;
	postName?: string;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	// get data from site map form database
	const data = await getDataFromGql(gqGetAllSlug);
	if (data.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	const currentTime = new Date().toLocaleDateString().replace(/\//g, '-');
	const queryUrl = '?page=1';
	// Method to source urls from cms
	// const urls = await fetch('https//example.com/api')
	const fields: ISitemapField[] = [
		{
			loc: `${_httpUrl}/${urlByCategory}`,
			lastmod: currentTime,
			changefreq: 'daily',
			priority: 1,
		},
		{
			loc: `${_httpUrl}/${urlByTag}`,
			lastmod: currentTime,
			changefreq: 'daily',
			priority: 1,
		},
		{
			loc: `${_httpUrl}/${urlByPost}${queryUrl}`,
			lastmod: currentTime,
			changefreq: 'daily',
			priority: 1,
		},
		{
			loc: `${_httpUrl}/${urlBySearch}?q=a&amp;page=1`,
			lastmod: new Date().toString(),
			changefreq: 'daily',
			priority: 1,
		},
	];
	for (const keyObj in data.data) {
		switch (keyObj) {
			case 'posts': {
				const res = data.data[keyObj].map((item: Item) => ({
					loc: `${_httpUrl}${formatSlugForPost(item.slug || '')}`,
					lastmod: item.updatedAt,
					changefreq: 'monthly',
					priority: '1',
					'news:news': `
						<news:publication>
							<news:name>${item.postName}</news:name>
							<news:language>vi</news:language>
						</news:publication>
						<news:publication_date>${item.updatedAt}</news:publication_date>
						<news:title>${item.postName}</news:title>
					`,
				}));
				fields.push(...res);
				break;
			}
			case 'categories': {
				const res = data.data[keyObj].map((item: Item) => ({
					loc: `${_httpUrl}${formatSlugForCategory(item.slug || '')}`,
					lastmod: item.updatedAt,
					changefreq: 'monthly',
					priority: '0.70',
				}));
				fields.push(...res);
				break;
			}
			case 'tags': {
				const res = data.data[keyObj].map((item: Item) => ({
					loc: `${_httpUrl}${formatSlugForTag(item.slug || '')}`,
					lastmod: item.updatedAt,
					changefreq: 'monthly',
					priority: '0.70',
				}));
				fields.push(...res);
				break;
			}
			case 'linkBottomItems': {
				const res = data.data[keyObj].map((item: Item) => ({
					loc: `${_httpUrl}${formatSlugForPage(item.url || '')}`,
					lastmod: item.updatedAt,
					changefreq: 'monthly',
					priority: '0.70',
				}));
				fields.push(...res);
				break;
			}
		}
	}

	return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function ServerSitemap() {
	return null;
}
