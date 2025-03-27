import { combineReducers, configureStore, createListenerMiddleware, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { commentsApi } from '../../entities/comment/api/commentApi';
import { saveState } from '../../shared/utils/LocalStorage';

import { authApi } from '../../entities/auth/api/AuthApi';
import authSlice, { AUTH_PERSISTENT_STATE, AuthState } from '../../entities/auth/slice/authSlice';
import { TokenResponse } from '../../entities/auth/types/AuthTypes';
import commentSlice from '../../entities/comment/slice/comment.Slice';
import { friendsApi } from '../../entities/friends/api/friendsApi';
import friendsSlice from '../../entities/friends/slices/friendsSlice';
import { mainFeedApi } from '../../entities/mainFeed/api/mainFeedApi ';
import mainFeedSlice from '../../entities/mainFeed/slices/mainFeedSlice';
import { messengerApi } from '../../entities/messenger/api/messengerApi';
import { profileApi } from '../../entities/profile/api/profileApi';
import profileSlice from '../../entities/profile/slices/profileSlice';
import { userApi } from '../../entities/user/api/userApi';
import userSlice, { setUser } from '../../entities/user/slice/userSlice';
import { USER_PERSISTENT_STATE, UserState } from '../../entities/user/types/UserTypes';
import { postsApi } from '../../shared/api/postsApi';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from '../../shared/ui/uiSlice';
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    predicate: isAnyOf(authApi.endpoints.login.matchFulfilled),
    effect: async (action: PayloadAction<TokenResponse>, listenerApi) => {
        const { access } = action.payload;
        try {
            const result = await listenerApi.dispatch(userApi.endpoints.getUser.initiate({ accessToken: access }));
            if (result.data) {
                listenerApi.dispatch(setUser(result.data));
                saveState<UserState>(store.getState().user, USER_PERSISTENT_STATE);
                listenerApi.unsubscribe();
            }
        } catch (error) {
            console.log(error);
        }
    },
});

// Типизация корневого состояния
export interface RootState {
    ui: UiTypes;
    mainFeed: ReturnType<typeof mainFeedSlice>;
    profile: ReturnType<typeof profileSlice>;
    friends: ReturnType<typeof friendsSlice>;
    auth: AuthState;
    user: UserState;
    comments: ReturnType<typeof commentSlice>;
    [friendsApi.reducerPath]: ReturnType<typeof friendsApi.reducer>;
    [mainFeedApi.reducerPath]: ReturnType<typeof mainFeedApi.reducer>;
    [commentsApi.reducerPath]: ReturnType<typeof commentsApi.reducer>;
    [messengerApi.reducerPath]: ReturnType<typeof messengerApi.reducer>;
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    [profileApi.reducerPath]: ReturnType<typeof profileApi.reducer>;
    [userApi.reducerPath]: ReturnType<typeof userApi.reducer>;
    [postsApi.reducerPath]: ReturnType<typeof postsApi.reducer>;
}

const rootAppReducer = combineReducers({
    [friendsApi.reducerPath]: friendsApi.reducer,
    [mainFeedApi.reducerPath]: mainFeedApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    ui: uiSlice,
    mainFeed: mainFeedSlice,
    profile: profileSlice,
    friends: friendsSlice,
    auth: authSlice,
    user: userSlice,
    comments: commentSlice,
});

const rootReducer: (state: RootState | undefined, action: PayloadAction) => RootState = (state, action) => {
    if (action.type === 'auth/logout') {
        return rootAppReducer(undefined, action);
    }
    return rootAppReducer(state, action);
};

const apis = [
    mainFeedApi,
    postsApi,
    friendsApi,
    commentsApi,
    messengerApi,
    authApi,
    profileApi,
    userApi,
  ] as const;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(
            ...apis.map((api) => api.middleware),
            listenerMiddleware.middleware,
        ),
});
store.subscribe(() => {
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE);
    saveState<AuthState>(store.getState().auth, AUTH_PERSISTENT_STATE);
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
