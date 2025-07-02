import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import useNotificationsBadge from '../../notifications/hooks/useNotifcationBadge';
import useMessages from '../hooks/useMessages';
import { selectDialogues, selectDialoguesSortedType } from '../slice/messagesSlice';
import { Message } from '../types/MessengerTypes';
import styles from './Chat.module.css';
import ChatAddMenu from './ChatAddMenu';
import DialogueItem from './DialogueItem';

/**
 * Компонент для отображения списка чатов
 * @returns JSX.Element Список чатов
 */
const ChatFeature: FC = () => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const userId = useSelector(selectUserId);
    const { refetch } = useMessages();
    const dialogues = useSelector(selectDialogues);
    const dialoguesSortedType = useSelector(selectDialoguesSortedType);
    const { count } = useNotificationsBadge(['new_message']);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (count && count > 0) {
            refetch();
        }
    }, [count, refetch]);

    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const sortedDialogues = useMemo(() => {
        if (!dialogues) return [];

        const dialoguesCopy = [...dialogues];

        switch (dialoguesSortedType) {
            case 'unread':
                return dialoguesCopy
                    .filter((dialogue) => !dialogue.is_read && dialogue.sender.id !== userId)
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            case 'sender':
                return dialoguesCopy.sort((a, b) => {
                    const getInterlocutorName = (dialogue: Message) => {
                        const fullName =
                            dialogue.sender.id === userId ? dialogue.recipient.full_name : dialogue.sender.full_name;
                        return fullName || '';
                    };

                    return getInterlocutorName(a).localeCompare(getInterlocutorName(b));
                });

            case 'all':
                return dialoguesCopy;
        }
    }, [dialogues, dialoguesSortedType, userId]);

    return (
        <>
            <Box
                className={cn(
                    styles.flex,
                    styles.alignItemsCenter,
                    styles.justifyContentSpaceBetween,
                    styles.chatFeature__header,
                )}
            >
                <Typography variant="subtitle1">Список чатов</Typography>

                <IconButton size="small" onMouseOver={handleClick}>
                    <AddCircleIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
                </IconButton>
            </Box>
            <Divider variant="fullWidth" />
            <Box className={cn(styles.chatScrollWrapper)} ref={contentRef}>
                <Box className={styles.chatScrollContainer} ref={listRef}>
                    {sortedDialogues &&
                        sortedDialogues.map((dialogue) => (
                            <DialogueItem
                                key={dialogue.id}
                                sender={dialogue.sender}
                                recipient={dialogue.recipient}
                                subHeader={dialogue.short_content}
                            />
                        ))}
                </Box>
                {scrollBar}
            </Box>
            {open && <ChatAddMenu open={open} anchor={anchorEl} onClose={handleClose} />}
        </>
    );
};

export default ChatFeature;
