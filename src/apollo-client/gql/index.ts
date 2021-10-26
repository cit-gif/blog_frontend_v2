import { gql } from '@apollo/client';
/**
 * get site map
 */
export const gqGetAllSlug = gql`
	query getAllSlug {
		posts {
			slug
			updatedAt
			postName
		}
		categories {
			slug
			updatedAt
		}
		tags {
			slug
			updatedAt
		}
		linkBottomItems {
			url
			updatedAt
		}
	}
`;

export const gqlGetAppSettings = gql`
	query GetAppSettings {
		appSetting {
			appName
			seoTitle
			seoKeywords
			seoDescription
			job
			adminName
			avatarAdmin {
				url
			}
			numberPhoneComponent {
				text
				number
			}
			seoImage {
				url
			}
			seoFBAppId
			seoGoogleSiteKey
			seoType
			plugins {
				scriptsHeaderFB
				commentsFB
				adsAsside
				scriptsHeaderGoogle
			}
		}
	}
`;
// export const gqlGetPlugins = gql`
// 	query GetPlugins {
// 		appSetting {
// 			plugins {
// 				scriptsHeaderFB
// 				adsAsside
// 				scriptsHeaderGoogle
// 			}
// 		}
// 	}
// `;
export const gqlFeaturedCategoriesAndPostsIn = gql`
	{
		featuredCategories(limit: 4, sort: "published_at:desc") {
			category {
				categoryName
				id
				slug

				posts(limit: 6, sort: "published_at:desc") {
					id
					like
					seen
					postName
					slug
					summary
					readingTime
					tags {
						name
						slug
						id
					}
					author {
						name
						id
					}
					metaImage {
						url
						alternativeText
					}
					metaKeywords
					published_at
					updatedAt
				}
			}
		}
	}
`;
export const gqlDataForLayout = gql`
	{
		featuredCategories(limit: 4, sort: "published_at:desc") {
			category {
				categoryName
				id
				slug
			}
		}
		tags {
			id
			name
			slug
		}
		countPostsInCategory {
			id
			categoryName
			countPosts
			slug
		}

		recommendedVideos(limit: 4, sort: "published_at:desc") {
			url
		}
		posts(limit: 3, sort: "seen:desc") {
			id
			like
			seen
			postName
			slug
			summary
			readingTime
			tags {
				name
				slug
				id
			}
			author {
				name
				id
			}
			metaImage {
				url
				alternativeText
			}
			metaKeywords
			published_at
			updatedAt
		}
	}
`;
export const gqlNewestPosts = gql`
	query getNewestPosts($limit: Int) {
		posts(limit: $limit, sort: "published_at:desc") {
			id
			like
			seen
			postName
			slug
			summary
			readingTime
			category {
				categoryName
				id
				slug
			}
			tags {
				name
				slug
				id
			}
			author {
				name
				id
			}
			metaImage {
				url
				alternativeText
			}
			metaKeywords
			published_at
			updatedAt
		}
	}
`;
export const gqlPostDetails = gql`
	query getPostDetails($slug: String) {
		posts(where: { slug: $slug }, limit: 1) {
			id
			readingTime
			like
			seen
			postName
			slug
			content
			summary
			readingTime
			category {
				categoryName
				slug
				id
			}
			tags {
				name
				slug
				id
			}
			author {
				name
				id
			}
			metaImage {
				url
				alternativeText
			}
			metaKeywords
			published_at
			updatedAt
		}
	}
`;
export const gqlRelatedPosts = gql`
	query getRelatedPosts($slug: String) {
		categories(where: { posts: { slug: $slug } }) {
			posts(limit: 5) {
				postName
				slug
				id
			}
		}
	}
`;
export const gqlFindPost = gql`
	query findPost($searchString: String, $limit: Int, $start: Int) {
		postsConnection(
			where: { _or: [{ postName_containss: $searchString }, { tags: { name_containss: $searchString } }] }
			sort: "published_at:desc"
			limit: $limit
			start: $start
		) {
			values {
				id
				like
				seen
				postName
				slug
				summary
				readingTime
				tags {
					name
					slug
					id
				}
				author {
					name
					id
				}
				metaImage {
					url
					alternativeText
					width
					height
				}
				metaKeywords
				published_at
				updatedAt
			}
			aggregate {
				count
			}
		}
	}
`;
export const gqlFindPostByCategory = gql`
	query findPostByCategory($slug: String, $limit: Int, $start: Int) {
		categories(where: { slug: $slug }, limit: 1) {
			categoryName
			seoDescription
		}
		postsConnection(
			where: { category: { slug: $slug } }
			sort: "published_at:desc"
			limit: $limit
			start: $start
		) {
			values {
				id
				like
				seen
				postName
				slug
				summary
				readingTime
				category {
					slug
					categoryName
					id
				}
				tags {
					name
					slug
					id
				}
				author {
					name
					id
				}
				metaImage {
					url
					alternativeText
					width
					height
				}
				metaKeywords
				published_at
				updatedAt
			}
			aggregate {
				count
				totalCount
			}
		}
	}
`;
export const gqlFindPostByTag = gql`
	query findPostByTag($slug: String, $limit: Int, $start: Int) {
		tags(where: { slug: $slug }, limit: 1) {
			name
			seoDescription
		}
		postsConnection(where: { tags: { slug: $slug } }, sort: "published_at:desc", limit: $limit, start: $start) {
			values {
				id
				like
				seen
				postName
				slug
				summary
				readingTime
				category {
					slug
					categoryName
					id
				}
				tags {
					name
					slug
					id
				}
				author {
					name
					id
				}
				metaImage {
					url
					alternativeText
					width
					height
				}
				metaKeywords
				published_at
				updatedAt
			}
			aggregate {
				count
				totalCount
			}
		}
	}
`;
export const gqlGetLinksBottom = gql`
	query getLinksBottom {
		linkBottomLabels {
			Label
			link_bottom_items {
				text
				url
			}
		}
	}
`;
export const gqlGetLinksBottomDetails = gql`
	query gqlGetLinksBottomDetails($slug: String) {
		linkBottomItems(where: { url: $slug }) {
			url
			text
			content
			seoDescription
			id
		}
	}
`;
/**
 * mutation
 */
export const gqlUpdateViewsForPost = gql`
	mutation updateViewForPost($id: ID) {
		updateViewsPost(id: $id) {
			seen
		}
	}
`;
export const gqlUpdateLikesForPost = gql`
	mutation updateLikesForPost($id: ID) {
		updateLikesPost(id: $id) {
			like
		}
	}
`;
export const gqlCreateCustomer = gql`
	mutation createCustomer($name: String, $numberPhone: String) {
		createCustomer(input: { data: { name: $name, numberPhone: $numberPhone } }) {
			customer {
				name
				numberPhone
			}
		}
	}
`;
