import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../../app/api/ApiConfig';
import { User } from '../types/UserTypes';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
    }),
    endpoints: (builder) => ({
        getUser: builder.query<User, { accessToken: string }>({
            query: ({ accessToken }) => ({
                url: `/${API.ME}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }),
        }),
    }),
});

