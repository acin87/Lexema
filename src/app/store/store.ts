import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commentsApi } from '../../entities/comment/api/commentApi';
import { saveState } from '../../shared/utils/LocalStorage';

import authSlice from '../../entities/auth/slice/AuthSlice';
import { messengerApi } from '../../entities/messenger/api/messengerApi';
import { postApi } from '../../entities/post/api/postsApi ';
import postSlice from '../../entities/post/slices/postSlice';
import { userApi } from '../../entities/user/api/userApi';
import friendsSlice from '../../entities/user/slices/friendsSlice';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from '../../shared/ui/uiSlice';
import { authApi } from '../../entities/auth/api/AuthApi';

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

    ui: uiSlice,
    post: postSlice,
    friends: friendsSlice,
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(
            postApi.middleware,
            userApi.middleware,
            commentsApi.middleware,
            messengerApi.middleware,
            authApi.middleware,
        ),
});
store.subscribe(() => {
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
