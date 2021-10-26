import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useAppSelector } from '@src/hooks/reduxHook';
import WidgetArticleTextRight from '@src/components/Widget/WidgetArticleTextRight';
import { getDataFromGql } from '@src/apollo-client/services';
import { gqlFeaturedCategoriesAndPostsIn, gqlNewestPosts } from '@src/apollo-client/gql';
import { postInterface } from '@src/interfaceGlobal';
import NotFoundArticle from '@src/components/Widget/NotFoundArticle';
import { urlByPost, _httpUrl } from '@src/config/constrant';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import Box from '@src/components/Box';
import Divider from '@src/components/Divider';
import TitleCate from '@src/components/TitleCate';
import LayoutWidgetLargePostInRight from '@src/components/Widget/LayoutWidgetLargePostInRight';
import LayoutWidgetLargePostInTop from '@src/components/Widget/LayoutWidgetLargePostInTop';
import Link from 'next/link';
import LayoutWidgetPostSlide from '@src/components/Widget/LayoutWidgetPostSlide';
interface Props {
	dataFeaturedCategoriesAndPostsIn: {
		category: {
			categoryName: string;
			id: string;
			slug: string;
			posts: postInterface[];
		};
	}[];
	dataNewestPosts: postInterface[];
}

const Home: NextPage<Props> = props => {
	const classNameFlexGapDefault = useAppSelector(state => state.app.classNameFlexGapDefault);

	const { dataFeaturedCategoriesAndPostsIn: categories, dataNewestPosts } = props;
	const dataNewestPostsLength = dataNewestPosts.length;

	return (
		<div className="flex flex-col gap-8">
			{/*
			 *seo
			 */}
			<NextSeo additionalLinkTags={[{ rel: 'canonical', href: _httpUrl }]} />
			{/**
			 * bài viết trong 4 danh mục được chọn
			 * mỗi phần laayout mỗi khác
			 */}
			{categories.map((item, key) => {
				switch (key) {
					case 0:
						return <LayoutWidgetLargePostInRight key={key} data={item} />;
					case 1:
						return <LayoutWidgetLargePostInTop key={key} data={item} />;
					case 3:
						return <LayoutWidgetPostSlide key={key} data={item} />;
				}
			})}

			<div>
				<TitleCate title="Tin tức gần đây" />
				<Box>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-4">
						{dataNewestPostsLength !== 0 ? (
							dataNewestPosts.map((item, key) => {
								return (
									<div key={key} className="w-full">
										<WidgetArticleTextRight size="lg" data={item} />
										<Divider />
									</div>
								);
								// if (key !== dataNewestPostsLength) {
								// 	return (
								// 		<div className="w-full" key={key}>
								// 			<WidgetArticleTextRight size="lg" data={item} />
								// 			<Divider />
								// 		</div>
								// 	);
								// }
								// return (
								// 	<div key={key}>
								// 		<WidgetArticleTextRight key={key} size="lg" data={item} />
								// 	</div>
								// );
							})
						) : (
							<NotFoundArticle />
						)}
						<Link href={`/${urlByPost}?page=1`}>
							<a className="btn btn-primary normal-case w-full flex-none">
								Xem tất cả bài viết
							</a>
						</Link>
					</div>
				</Box>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props | any> = async context => {
	const dataFeaturedCategoriesAndPostsIn = await getDataFromGql(gqlFeaturedCategoriesAndPostsIn);
	const dataNewestPosts = await getDataFromGql(gqlNewestPosts, { limit: 9 });

	if (dataFeaturedCategoriesAndPostsIn.error || dataNewestPosts.error) {
		return {
			redirect: {
				destination: '/500',
				permanent: false,
			},
		};
	}
	return {
		props: {
			dataFeaturedCategoriesAndPostsIn: dataFeaturedCategoriesAndPostsIn.data.featuredCategories,
			dataNewestPosts: dataNewestPosts.data.posts,
		},
	};
};
export default Home;
