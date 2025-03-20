import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { commentsApi } from '../../entities/comment/api/commentApi';
import { saveState } from '../../shared/utils/LocalStorage';

import { authApi } from '../../entities/auth/api/AuthApi';
import authSlice, { AUTH_PERSISTENT_STATE, AuthState } from '../../entities/auth/slice/authSlice';
import { friendsApi } from '../../entities/friends/api/friendsApi';
import friendsSlice from '../../entities/friends/slices/friendsSlice';
import { messengerApi } from '../../entities/messenger/api/messengerApi';
import { postApi } from '../../entities/post/api/postsApi ';
import postSlice from '../../entities/post/slices/postSlice';
import { profileApi } from '../../entities/profile/api/profileApi';
import profileSlice from '../../entities/profile/slices/profileSlice';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from '../../shared/ui/uiSlice';

const rootReducer = combineReducers({
    [friendsApi.reducerPath]: friendsApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    ui: uiSlice,
    post: postSlice,
    profile: profileSlice,
    friends: friendsSlice,
    auth: authSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(
            postApi.middleware,
            friendsApi.middleware,
            commentsApi.middleware,
            messengerApi.middleware,
            authApi.middleware,
            profileApi.middleware,
        ),
});
store.subscribe(() => {
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE);
    saveState<AuthState>(store.getState().auth, AUTH_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
