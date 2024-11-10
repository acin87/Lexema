import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../reducers/posts/postsApi ';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from '../reducers/uiSlice/uiSlice';
import { userApi } from '../reducers/user/userApi';
import { saveState } from '../util/LocalStorage';
import { commentsApi } from '../reducers/comments/commentsApi';

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    ui: uiSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) =>
        getDefaultMidleware().concat(postsApi.middleware, userApi.middleware, commentsApi.middleware),
});
store.subscribe(() => {
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
