import {
	appSetingsInterface,
	categoryCountPostInterface,
	featuredCategoryInterface,
	linkBottomInterface,
	postInterface,
	recommendedVideosInterface,
	tagArticleInterface,
} from '@src/interfaceGlobal';
import React, { useContext, useEffect, useState } from 'react';

interface Props {
	children?: React.ReactNode;
	data: {
		featuredCategories: featuredCategoryInterface[]; // 4 danh sách danh mục được chọn để hiển thi
		countPostsInCategory: categoryCountPostInterface[]; // tất cả danh mục
		dataTags: tagArticleInterface[];
		recommendedVideos: recommendedVideosInterface[];
		dataNewestPosts: postInterface[];
		dataLinksBottom: linkBottomInterface[];
		dataPostsMostViews: postInterface[];
		dataAppSettings: appSetingsInterface;
	};
}
type appContextType = {
	featuredCategories: featuredCategoryInterface[]; // 4 danh sách danh mục được chọn để hiển thi
	countPostsInCategory: categoryCountPostInterface[]; // tất cả danh mục
	dataTags: tagArticleInterface[];
	recommendedVideos: recommendedVideosInterface[];
	dataNewestPosts: postInterface[];
	dataLinksBottom: linkBottomInterface[];
	dataPostsMostViews: postInterface[];
	///
	getMoreCategory: categoryCountPostInterface[];
	dataAppSettings: appSetingsInterface;
};
const AppContext = React.createContext<appContextType>({} as any);

export default function AppProvider(props: Props) {
	props.data;

	/**
	 * lấy các danh mục cho dropdown "tất cả"
	 * countPostsInCategory chứa tất cả danh mục
	 * featuredCategories chưa danh mục được chọn để hiển thị
	 * ==> trả về các danh mục khác với danh mục được chọn
	 */
	const arrlength = props.data.featuredCategories.length;

	const getMoreCategory = (() => {
		return props.data.countPostsInCategory.filter(item => {
			let i = 0;
			let check = true;
			for (i; i < arrlength; i++) {
				if (item.id === props.data.featuredCategories[i].category.id) {
					check = false;
					break;
				}
			}
			return check;
		});
	})();
	const [state, setState] = useState({
		getMoreCategory,
		...props.data,
	});
	useEffect(() => {
		// setState({getMoreCategory,...props.data});
		setState({ ...state, dataNewestPosts: props.data.dataNewestPosts });
	}, [props.data.dataNewestPosts]);
	return (
		<AppContext.Provider
			value={{
				...state,
			}}>
			{props.children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
