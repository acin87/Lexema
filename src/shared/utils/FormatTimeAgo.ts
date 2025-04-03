

/**
 * Форматирует время в прошедшее время
 * @param dateString - строка с датой
 * @returns строку с прошедшим временем
 */
export const formatTimeAgo = (dateString: string, isText: boolean = true): string => {

    const date = new Date(dateString);

    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();

    const text = isText ? ' назад' : '';
 
    const seconds = Math.floor(diffInMs / 1000);

    if (seconds === 0) {
        return 'Только что';
    }

    if (seconds < 60) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(seconds);
        
        switch(rule) {
            case 'one':
                return `${seconds} секунду ${text}`;
            case 'few':
                return `${seconds} секунды ${text}`;
            default:
                return `${seconds} секунд ${text}`;
        }
    }


    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(minutes);
        
        switch(rule) {
            case 'one':
                return `${minutes} минуту ${text}`;
            case 'few':
                return `${minutes} минуты ${text}`;
            default:
                return `${minutes} минут ${text}`;
        }
    }


    const hours = Math.floor(minutes / 60);

    if (hours < 24) {

        const pluralRule = new Intl.PluralRules('ru');
        const rule = pluralRule.select(hours);
        
        switch(rule) {
            case 'one':
                return `${hours} час ${text}`;
            case 'few':
                return `${hours} часа ${text}`;
            default:
                return `${hours} часов ${text}`;
        }
    }


    const days = Math.floor(hours / 24);
    

    const pluralRule = new Intl.PluralRules('ru');
    const rule = pluralRule.select(days);
    
    switch(rule) {
        case 'one':
            return `${days} день ${text}`;
        case 'few':
            return `${days} дня ${text}`;
        default:
            return `${days} дней ${text}`;
    }
};