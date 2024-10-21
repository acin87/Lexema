import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../reducers/posts/postsApi ';
import { userApi } from '../reducers/user/userApi';
import uiSlice, { UI_PERSISTENT_STATE, UiTypes } from '../reducers/uiSlice/uiSlice';
import { saveState } from '../util/LocalStorage';

const rootReducer = combineReducers({
    userApi: userApi.reducer,
    postsApi: postsApi.reducer,
    ui: uiSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) => getDefaultMidleware().concat([postsApi.middleware, userApi.middleware]),
});
store.subscribe(()=>{
    saveState<UiTypes>(store.getState().ui, UI_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
