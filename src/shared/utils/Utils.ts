interface ApiError {
    data: {
        [key: string]: string[];
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
        const sec = Intl.PluralRules('ru-RU').select(seconds);
        return `${seconds} секунд назад`;
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
    return typeof error === 'object' && error !== null && 'data' in error;
};
