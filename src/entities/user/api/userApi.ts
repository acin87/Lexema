import { createApi } from '@reduxjs/toolkit/query/react';
import { API } from '../../../app/api/ApiConfig';
import { baseQueryWithReauth } from '../../../app/api/Utils';
import { AutocompleteResponse, User } from '../types/UserTypes';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getUser: builder.query<User, { accessToken: string }>({
            query: ({ accessToken }) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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
