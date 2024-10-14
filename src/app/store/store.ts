import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from '../reducers/auth/authApi';
import { postsApi } from '../reducers/posts/postsApi ';
//import { saveState } from '../util/LocalStorage';

//const JWT_PERSISTENT_STATE = 'userData';

const rootReducer = combineReducers({
    authApi: authApi.reducer,
    postsApi: postsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMidleware) => getDefaultMidleware().concat([postsApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
