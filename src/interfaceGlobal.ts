export interface tagArticleInterface {
	id: string;
	name: string;
	slug: string;
}
export interface categoryCountPostInterface {
	id: string;
	categoryName: string;
	slug: string;
	countPosts: number;
}
export interface categoryInterface {
	id: string;
	categoryName: string;
	slug: string;
}
export interface postInterface {
	id: string;
	like: Number;
	seen: Number;
	postName: string;
	slug: string;
	summary?: string;
	readingTime?: string;
	category?: {
		slug: string;
		categoryName: string;
		id: string;
	};
	tags?: tagArticleInterface[];
	author: {
		name: string;
		id: string;
	};
	metaImage?: {
		url: string;
		alternativeText: string;
	};
	metaKeywords: string;
	published_at: string;
	updatedAt: string;
}
export interface featuredCategoryInterface {
	category: {
		categoryName: string;
		id: string;
		slug: string;
	};
}
export interface recommendedVideosInterface {
	url: string;
}

export interface postDetailsInterface {
	id: string;
	like: Number;
	seen: Number;
	postName: string;
	slug: string;
	content: string;
	summary?: string;
	readingTime?: string;
	tags?: tagArticleInterface[];
	category?: {
		categoryName?: string;
		slug: string;
		id: string;
	};
	author: {
		name: string;
		id: string;
	};
	metaImage: {
		url: string;
		alternativeText: string;
	};
	metaKeywords: string;
	published_at: string;
	updatedAt: string;
}
/**
 *
 */
export interface dataForLayoutInterface {
	featuredCategories: featuredCategoryInterface[];
	tags: tagArticleInterface[];
	countPostsInCategory: categoryCountPostInterface[];
	recommendedVideos: recommendedVideosInterface[];
	posts: postInterface[];
}
/**
 * breadcrumb
 */
export interface breadcrumbInterface {
	label: string;
	href: string;
}
/**
 * link bottom
 */
export interface linkBottomItemInterface {
	text: string;
	url: string;
	seoDescription?: string;
	content?: string;
}
export interface linkBottomInterface {
	Label: string;
	link_bottom_items: linkBottomItemInterface[];
}
export interface appSetingsInterface {
	appName: string;
	seoTitle: string;
	seoKeywords?: string;
	seoDescription?: string;
	job?: string;
	adminName?: string;
	avatarAdmin?: {
		url?: string;
	};
	numberPhoneComponent?: {
		text?: string;
		number?: string;
	};
	seoImage?: {
		url?: string;
	};
	plugins?: {
		scriptsHeaderFB?: string;
		commentsFB?: string;
		adsAsside?: string;
		scriptsHeaderGoogle?: string;
	};
	seoFBAppId?: string;
	seoGoogleSiteKey?: string;
	seoType?: string;
}
