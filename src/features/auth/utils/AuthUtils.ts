export interface ApiError {
    data?: {
        [key: string]: string[] | string;
    };
    status: number | string;
    error?: string;
}

export const isAuthApiError = (error: unknown): error is ApiError => {
    if (typeof error !== 'object' || error === null) {
        return false;
    }

    // Проверка для ошибки типа FETCH_ERROR
    if (
        'status' in error &&
        error.status === 'FETCH_ERROR' &&
        'error' in error &&
        typeof error.error === 'string'
    ) {
        return true;
    }

    // Проверка для ошибки с кодом статуса и данными
    if (
        'status' in error &&
        typeof error.status === 'number' &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        Object.values(error.data).every((value) => 
            typeof value === 'string' || 
            (Array.isArray(value) && value.every((item) => typeof item === 'string'))
        )
    ) {
        return true;
    }
    return false;
};