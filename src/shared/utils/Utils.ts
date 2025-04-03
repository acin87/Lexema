import { cloneElement, ReactElement } from 'react';
import { BASEURL } from '../../app/api/ApiConfig';

interface ApiError {
    data: {
        [key: string]: string[] | string;
    };
    status: number;
}

export const getRelativeTime = (serverDateString: string | undefined): string => {
    if (serverDateString != undefined) {
        const parts = serverDateString.split(/[. ,:]/);
        const serverDate = new Date(
            parseInt(parts[2], 10), // Год
            parseInt(parts[1], 10) - 1, // Месяц
            parseInt(parts[0], 10), // День
            parseInt(parts[4], 10), // Часы
            parseInt(parts[5], 10), // Минуты
            parseInt(parts[6], 10), // Секунды
        );
        const currentDate = new Date();

        // Разница между текущим временем и временем создания коммента
        const diffInMs = currentDate.getTime() - serverDate.getTime();

        const seconds = Math.floor(diffInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days >= 1) {
            return serverDate.toLocaleDateString();
        } else if (hours >= 1) {
            return `${hours} час${hours === 1 ? '' : 'а'} назад`; //поправить окончания
        } else if (minutes >= 1) {
            return `${minutes} минут${minutes === 1 ? '' : 'у'} назад`;
        } else if (seconds > 0) {
            return `${seconds} секунд${seconds === 1 ? '' : 'у'} назад`;
        } else {
            return 'Только что';
        }
    }
    return 'error';
};
// Функция для преобразования временной метки в строковый формат
export const formatTimeAgo = (dateString: string): string => {
    // Преобразуем строку в объект Date
    const date = new Date(dateString);
    // Получаем текущее время
    const now = new Date();
    // Вычисляем разницу между текущим временем и переданной датой
    const diffInMs = now.getTime() - date.getTime();

    // Переводим миллисекунды в секунды
    const seconds = Math.floor(diffInMs / 1000);

    if (seconds === 0) {
        return 'Только что';
    }

    if (seconds < 60) {
        const sec = new Intl.PluralRules('ru-RU').select(seconds);
        console.log('sec', sec);
        return `${seconds} секунд${sec === 'one' ? '' : 'ы'} назад`;
    }

    // Переводим секунды в минуты
    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} минут назад`;
    }

    // Переводим минуты в часы
    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} часов назад`;
    }

    // Переводим часы в дни
    const days = Math.floor(hours / 24);

    return `${days} дней назад`;
};

export const isApiError = (error: unknown): error is ApiError => {
    if (typeof error !== 'object' || error === null) {
        return false;
    }

    // Проверка на структуру { data: { [key: string]: string[] }, status: number }
    if (
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        Object.values(error.data).every(
            (value) =>
                typeof value === 'string' || (Array.isArray(value) && value.every((item) => typeof item === 'string')),
        ) &&
        'status' in error &&
        typeof error.status === 'number'
    ) {
        return true;
    }

    return false;
};
export const checkUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `${BASEURL}${url}`;
    }
    return url;
};


export const generate = (element: ReactElement<unknown>) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((value, index) =>
        cloneElement(
            element,
            { key: value },
        
        ),
    );
};