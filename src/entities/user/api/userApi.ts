import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { RootState } from '../../../app/store/store';
import { AutocompleteResponse, User } from '../types/UserTypes';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.access;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUser: builder.query<User, {accessToken: string}>({
            query: ({accessToken}) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
        }),


        getAutocomplete: builder.query<AutocompleteResponse, { q: string }>({
            query: ({ q }) => ({
                url: `/${API.AUTOCOMPLETE}?q=${q}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAutocompleteQuery, useLazyGetAutocompleteQuery } = userApi;
