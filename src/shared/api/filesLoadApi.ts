import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../app/api/ApiConfig';

interface FileUploadResponse {
    fileUrl: string
}

const filesLoadApi = createApi({
    reducerPath: 'filesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['files'],
    endpoints: (builder) => ({
        multipleImageLoad: builder.mutation<FileUploadResponse, FormData>({
            query: (data) => ({
                url: API.FILES,
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
        }),
    }),
});

export const { useMultipleImageLoadMutation } = filesLoadApi;
