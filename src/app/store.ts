import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import globalReducer from '../features/global/globalSlice';
import authSlice from '../features/auth/authSlice';

export const store = configureStore({
	reducer: {
		global: globalReducer,
		auth: authSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;