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