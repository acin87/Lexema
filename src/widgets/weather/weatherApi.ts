import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherApiResponse } from './weatherTypes';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.weatherapi.com/v1/current.json',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getWeather: builder.query<WeatherApiResponse, { key: string; city: string }>({
            query: ({ key, city }) => ({
                url: `?key=${key}&q=${city}&days=1&lang=ru`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetWeatherQuery } = weatherApi;
