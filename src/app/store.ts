import { postReducer } from '@src/PostSliceReducer';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '@src/app/appSlice';

const store = configureStore({
	reducer: {
		app: appReducer,
		post: postReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
