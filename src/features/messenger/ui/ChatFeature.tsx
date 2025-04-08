import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import cn from 'classnames';
import { FC, MouseEvent, useState } from 'react';
import useCustomScrollBar from '../../../shared/hooks/useCustomScrollBar';
import useMessages from '../hooks/useMessages';
import styles from './Chat.module.css';
import ChatAddMenu from './ChatAddMenu';
import DialogueItem from './DialogueItem';

const ChatFeature: FC = () => {
    const { contentRef, listRef, scrollBar } = useCustomScrollBar();
    const { dialogues } = useMessages();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    {dialogues &&
                        dialogues.results.map((dialogue) => (
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
