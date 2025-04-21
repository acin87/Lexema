import { useCallback } from 'react';

/**
 * Хук для получения метки дня для сообщения
 * @returns функция для получения метки дня
 */
export const useLabelDay = () => {
    /**
     * Функция для получения метки дня для сообщения
     * @param timestamp - временная метка сообщения
     * @returns строка с меткой дня
     */
    const getDayLabel = useCallback((timestamp: string | Date) => {
        // Преобразуем timestamp в дату
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const messageDate = new Date(timestamp);
        messageDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - messageDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Сегодня';
        if (diffDays === 1) return 'Вчера';

        return messageDate.toLocaleDateString();
    }, []);

    return getDayLabel;
};

