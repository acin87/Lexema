import { cloneElement, ReactElement } from 'react';
import { BASEURL } from '../../app/api/ApiConfig';

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

export const checkUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `${BASEURL}${url}`;
    }
    return url;
};

export const generate = (element: ReactElement<unknown>) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((value) =>
        cloneElement(element, { key: value }),
    );
};
