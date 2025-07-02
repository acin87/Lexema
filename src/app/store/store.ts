import { combineReducers, configureStore, createListenerMiddleware, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { commentsApi } from '../../entities/comment/api/commentApi';
import { saveState } from '../../shared/utils/LocalStorage';

import commentSlice from '../../entities/comment/slice/comment.Slice';
import { postApi } from '../../entities/post/api/postApi ';
import { userApi } from '../../entities/user/api/userApi';
import userSlice, { setUser } from '../../entities/user/slice/userSlice';
import { USER_PERSISTENT_STATE, UserState } from '../../entities/user/types/UserTypes';
import { authApi } from '../../features/auth/api/AuthApi';
import authSlice, { AUTH_PERSISTENT_STATE, AuthState } from '../../features/auth/slice/authSlice';
import { TokenResponse } from '../../features/auth/types/AuthTypes';
import feedSlice from '../../features/feed/slice/feedSlice';
import { friendsApi } from '../../features/friends/api/friendsApi';
import friendsSlice from '../../features/friends/slices/friendsSlice';
import { messengerApi } from '../../features/messenger/api/messengerApi';
import { profileApi } from '../../features/profile/api/profileApi';
import profileSlice from '../../features/profile/slices/profileSlice';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from './uiSlice';
import notificationsSlice from '../../features/notifications/slice/notificationsSlice';
import { notificationApi } from '../../features/notifications/api/notificationApi';
import messagesSlice from '../../features/messenger/slice/messagesSlice';
import { weatherApi } from '../../widgets/weather/weatherApi';
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    predicate: isAnyOf(authApi.endpoints.login.matchFulfilled),
    effect: async (action: PayloadAction<TokenResponse>, listenerApi) => {
        const { access } = action.payload;
        try {
            const result = await listenerApi.dispatch(userApi.endpoints.getUser.initiate({accessToken: access}));
            console.log(result);
            if (result.data) {
                listenerApi.dispatch(setUser(result.data));
                saveState<UserState>(store.getState().user, USER_PERSISTENT_STATE);
            }
        } catch (error) {
            console.log(error);
        }
    },
});

// Типизация корневого состояния
export interface RootState {
    ui: UiTypes;
    feed: ReturnType<typeof feedSlice>;
    profile: ReturnType<typeof profileSlice>;
    friends: ReturnType<typeof friendsSlice>;
    notifications: ReturnType<typeof notificationsSlice>;
    messages: ReturnType<typeof messagesSlice>;
    auth: AuthState;
    user: UserState;
    comments: ReturnType<typeof commentSlice>;
    [friendsApi.reducerPath]: ReturnType<typeof friendsApi.reducer>;
    [postApi.reducerPath]: ReturnType<typeof postApi.reducer>;
    [commentsApi.reducerPath]: ReturnType<typeof commentsApi.reducer>;
    [messengerApi.reducerPath]: ReturnType<typeof messengerApi.reducer>;
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    [profileApi.reducerPath]: ReturnType<typeof profileApi.reducer>;
    [userApi.reducerPath]: ReturnType<typeof userApi.reducer>;
    [notificationApi.reducerPath]: ReturnType<typeof notificationApi.reducer>;
    [weatherApi.reducerPath]: ReturnType<typeof weatherApi.reducer>;
    
}

const rootAppReducer = combineReducers({
    [friendsApi.reducerPath]: friendsApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [messengerApi.reducerPath]: messengerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    ui: uiSlice,
    feed: feedSlice,
    profile: profileSlice,
    friends: friendsSlice,
    auth: authSlice,
    user: userSlice,
    comments: commentSlice,
    notifications: notificationsSlice,
    messages: messagesSlice,
});

const rootReducer: (state: RootState | undefined, action: PayloadAction) => RootState = (state, action) => {
    if (action.type === 'auth/logout') {
        return rootAppReducer(undefined, action);
    }
    return rootAppReducer(state, action);
};

const apis = [postApi, friendsApi, commentsApi, messengerApi, authApi, profileApi, userApi, notificationApi, weatherApi] as const;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(...apis.map((api) => api.middleware), listenerMiddleware.middleware),
});
store.subscribe(() => {
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE);
    saveState<AuthState>(store.getState().auth, AUTH_PERSISTENT_STATE);
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
