import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { flexGapCss, roundedCss, shadowCss, typeTheme } from '@src/typesGlobal';

interface interfaceState {
	theme: typeTheme;
	showMenuMobile: boolean;
	classNameFontSizeIconDefault: string;
	classNameRounedDefault: roundedCss;
	classNameLinkHeaderDefault: string;
	// classNameShadowDefault: shadowCss;
	classNameShadowDefault: string;
	classNameBoxWidgetDefault: string;

	classNameFlexGapDefault: flexGapCss;
	appName: string;
	adminName: string;
	headerHeight: number;
	numberPhone: string;
}
const initialState: interfaceState = {
	theme: 'emerald',
	showMenuMobile: false,
	classNameFontSizeIconDefault: 'text-lg',
	classNameLinkHeaderDefault: 'btn btn-ghost font-medium text-lg normal-case rounded-btn',
	classNameRounedDefault: 'rounded-md',
	classNameShadowDefault: 'shadow-sm',
	classNameBoxWidgetDefault: 'hover:shadow border-solid border', //article
	classNameFlexGapDefault: 'gap-4',
	appName: 'Ap name',
	adminName: 'admin',
	numberPhone: '012321321',
	headerHeight: 0,
};
const appSlice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		setTheme(state, actions: PayloadAction<typeTheme>) {
			// nếu dùng interface thì phải paload.theme
			state.theme = actions.payload;
		},
		setShowMenuMobile(state, actions: PayloadAction<boolean>) {
			state.showMenuMobile = actions.payload;
		},
		setHeaderHeight(state, actions: PayloadAction<number>) {
			state.headerHeight = actions.payload;
		},
	},
});
export const appReducer = appSlice.reducer;
export const appReducerActions = appSlice.actions;
export default appSlice;
