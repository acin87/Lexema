import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import { clearCredentials, setCredentials, setIsAutorized } from '../../features/auth/slice/authSlice';
import { TokenResponse } from '../../features/auth/types/AuthTypes';
import { RootState } from '../store/store';
import { API, BASEURL } from './ApiConfig';
/**
 * Базовый запрос
 * @param headers - заголовки запроса
 * @param getState - функция для получения состояния
 */
const baseQuery = fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.access;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

/**
 * Базовый запрос с перезапросом токена
 * @param args - аргументы запроса
 * @param api - API
 * @param extraOptions - дополнительные опции
 */
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const state = api.getState() as RootState;
    if (typeof args !== 'string' && args.url !== API.LOGIN && args.url !== API.REFRESH && args.url !== `/${API.ME}` && args.url !== API.REGISTRATION && !state.auth.isAuthorized) {
        console.warn('User is not authenticated. Redirecting to login...');
        console.log(args.url);
        return { error: { status: 401, data: 'Not authorized!!!' } };
    }
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401 && typeof args !== 'string' && args.url !== API.LOGIN) {
        console.warn('User is not authenticated. Refreshing token...');
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            const refreshResult = await baseQuery(
                { url: API.REFRESH, method: 'POST', body: { refreshToken } },
                api,
                extraOptions,
            );
            if (refreshResult.data) {
                console.log('Token refreshed successfully');
                const data = refreshResult.data as TokenResponse;
                api.dispatch(setCredentials(data));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(clearCredentials());
            }
        } else {
            console.warn('No refresh token found. User is not authenticated.');
            api.dispatch(clearCredentials());
            api.dispatch(setIsAutorized(false));
        }
    }
    return result;
};

export interface ApiError {
    data?: {
        [key: string]: string[] | string;
    };
    status: number | string;
    error?: string;
}

export const isApiError = (error: unknown): error is ApiError => {
    if (typeof error !== 'object' || error === null) {
        return false;
    }

    // Проверка для ошибки типа FETCH_ERROR
    if ('status' in error && error.status === 'FETCH_ERROR' && 'error' in error && typeof error.error === 'string') {
        return true;
    }

    // Проверка для ошибки с кодом статуса и данными
    if (
        'status' in error &&
        typeof error.status === 'number' &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        Object.values(error.data).every(
            (value) =>
                typeof value === 'string' || (Array.isArray(value) && value.every((item) => typeof item === 'string')),
        )
    ) {
        return true;
    }
    return false;
};
