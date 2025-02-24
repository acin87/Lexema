import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API, BASEURL } from '../../app/api/ApiConfig';

interface FileUploadResponse {
    fileUrls: string[]
}

const filesApi = createApi({
    reducerPath: 'filesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
    tagTypes: ['imageFiles'],
    endpoints: (builder) => ({
        multipleImageLoad: builder.mutation<FileUploadResponse, FormData>({
            query: (files) => ({
                url: API.FILES,
                method: 'POST',
                body: files,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
        }),
    }),
});

export const { useMultipleImageLoadMutation } = filesApi;
