import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface interfaceState {
	arrayUrlImg: string[];
	isOpen: boolean;
	indexImage: number;
}
const initialState: interfaceState = {
	arrayUrlImg: [],
	isOpen: false,
	indexImage: 0,
};
const postSlice = createSlice({
	name: 'postSlice',
	initialState: initialState,
	reducers: {
		setIsOpen(state, actions: PayloadAction<boolean>) {
			state.isOpen = actions.payload;
		},
		setArrayUrlImg(state, actions: PayloadAction<string[]>) {
			state.arrayUrlImg = actions.payload;
		},
		setIndexImage(state, actions: PayloadAction<number>) {
			state.indexImage = actions.payload;
		},
	},
});
export const postReducer = postSlice.reducer;
export const postReducerActions = postSlice.actions;
export default postSlice;
