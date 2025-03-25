

/**
 * Форматирует время в прошедшее время
 * @param dateString - строка с датой
 * @returns строку с прошедшим временем
 */
export const formatTimeAgo = (dateString: string): string => {

    const date = new Date(dateString);

    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();

 
    const seconds = Math.floor(diffInMs / 1000);

    if (seconds === 0) {
        return 'Только что';
    }

    if (seconds < 60) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(seconds);
        
        switch(rule) {
            case 'one':
                return `${seconds} секунду назад`;
            case 'few':
                return `${seconds} секунды назад`;
            default:
                return `${seconds} секунд назад`;
        }
    }


    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(minutes);
        
        switch(rule) {
            case 'one':
                return `${minutes} минуту назад`;
            case 'few':
                return `${minutes} минуты назад`;
            default:
                return `${minutes} минут назад`;
        }
    }


    const hours = Math.floor(minutes / 60);

    if (hours < 24) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(hours);
        
        switch(rule) {
            case 'one':
                return `${hours} час назад`;
            case 'few':
                return `${hours} часа назад`;
            default:
                return `${hours} часов назад`;
        }
    }


    const days = Math.floor(hours / 24);
    

    const pluralRule = new Intl.PluralRules('ru');
    const rule = pluralRule.select(days);
    
    switch(rule) {
        case 'one':
            return `${days} день назад`;
        case 'few':
            return `${days} дня назад`;
        default:
            return `${days} дней назад`;
    }
};