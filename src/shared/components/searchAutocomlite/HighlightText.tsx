import { Typography } from '@mui/material';
import { memo } from 'react';

/**
 * Функция для экранирования специальных символов в строке
 * @param string - Строка для экранирования
 * @returns Строку с экранированными специальными символами
 */
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Компонент для выделения текста в строке
 * @param text - Текст для выделения
 * @param searchTerm - Поисковый запрос для выделения
 * @returns Компонент для выделения текста в строке
 */
const HighlightText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
    if (!searchTerm || !text) return text;

    const parts = text.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} component={'span'} key={i}>
                        {part}
                    </Typography>
                ) : (
                    <Typography component={'span'} key={i}>
                        {part}
                    </Typography>
                ),
            )}
        </>
    );
};

export default memo(HighlightText);
