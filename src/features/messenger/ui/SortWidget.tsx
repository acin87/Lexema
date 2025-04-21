import { Card, CardContent, CardHeader, List, ListItemButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store/store.ts';
import { selectDialoguesSortedType, setDialoguesSortedType } from '../slice/messagesSlice';

/**
 *  Компонент для сортировки диалогов
 * @returns SortWidget - компонент для сортировки диалогов
 */
const SortWidget: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const sortType = useSelector(selectDialoguesSortedType);

    const handleSort = (sortType: 'all' | 'unread' | 'sender') => {
        dispatch(setDialoguesSortedType(sortType));
    };

    return (
        <Card>
            <CardHeader
                title={<Typography variant="h6">Сортировка</Typography>}
                sx={{
                    '& .MuiCardHeader-content': { minWidth: 0 },
                }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    pt: 0,
                }}
            >
                <List sx={{ '& .Mui-selected': { backgroundColor: 'secondary.light' } }}>
                    <ListItemButton selected={sortType === 'all'} onClick={() => handleSort('all')}>
                        <Typography variant="h6">Все</Typography>
                    </ListItemButton>
                    <ListItemButton selected={sortType === 'unread'} onClick={() => handleSort('unread')}>
                        <Typography variant="h6">Не прочитанным</Typography>
                    </ListItemButton>
                    <ListItemButton selected={sortType === 'sender'} onClick={() => handleSort('sender')}>
                        <Typography variant="h6">По отправителю</Typography>
                    </ListItemButton>
                </List>
            </CardContent>
        </Card>
    );
};

export default SortWidget;
