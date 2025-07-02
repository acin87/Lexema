import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { Autocomplete } from '../../entities/user/types/UserTypes';

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
const HighlightText = ({ user, searchTerm }: { user: Autocomplete; searchTerm: string }) => {
    const { first_name, last_name, username } = user;
    const fullName = `${first_name} ${last_name || ''}`.trim();
    const usernameDisplay = username ? `(${username})` : '';

    if (!searchTerm) {
        return (
            <>
                {fullName} {usernameDisplay && <span style={{ opacity: 0.7 }}>{usernameDisplay}</span>}
            </>
        );
    }

    // Проверяем, есть ли совпадение в username
    const isUsernameMatch = username?.toLowerCase().includes(searchTerm.toLowerCase());
    const isNameMatch = fullName.toLowerCase().includes(searchTerm.toLowerCase());

    // Если совпадение в username, но не в имени — выводим username с подсветкой
    if (isUsernameMatch && !isNameMatch) {
        const usernameParts = username!.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));

        return (
            <>
                <Typography component="span">{fullName}</Typography>
                <Box sx={{ display: 'flex', opacity: 0.7 }}>
                    (
                    {usernameParts.map((part, i) =>
                        part.toLowerCase() === searchTerm.toLowerCase() ? (
                            <Typography key={i} sx={{ color: 'warning.main', fontWeight: 300 }}>
                                {part}
                            </Typography>
                        ) : (
                            <Typography key={i}>{part}</Typography>
                        ),
                    )}
                    )
                </Box>
            </>
        );
    }

    // Если совпадение в имени/фамилии — подсвечиваем их
    const nameParts = fullName.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));

    return (
        <>
            {nameParts.map((part, i) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                    <Typography key={i} sx={{ color: 'warning.main', fontWeight: 300 }}>
                        {part}
                    </Typography>
                ) : (
                    <Typography key={i}>{part}</Typography>
                ),
            )}
            {usernameDisplay && (
                <Box sx={{ display: 'flex', opacity: 0.7 }}>
                    {isUsernameMatch
                        ? usernameDisplay.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi')).map((part, i) =>
                              part.toLowerCase() === searchTerm.toLowerCase() ? (
                                  <Typography key={i} sx={{ color: 'warning.main', fontWeight: 300 }}>
                                      {part}
                                  </Typography>
                              ) : (
                                  <Typography key={i}>{part}</Typography>
                              ),
                          )
                        : usernameDisplay}
                </Box>
            )}
        </>
    );
};

export default memo(HighlightText);
