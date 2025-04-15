import { CloseOutlined } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import cn from 'classnames';
import { FC, memo, useState } from 'react';
import { checkUrl } from '../../../shared/utils/Utils';
import { Friend } from '../../friends/types/FriendTypes';
import { useMessageActions } from '../hooks/useMessageActions';
import styles from './Chat.module.css';

interface AddNewDialogueProps {
    open: boolean;
    onClose: () => void;
    user: Pick<Friend, 'friend_id' | 'avatar' | 'full_name' | 'last_login'> | undefined;
}
const AddNewDialogue: FC<AddNewDialogueProps> = ({ open, onClose, user }) => {
    const { sendMessage } = useMessageActions();
    const [focus, setFocus] = useState(false);
    const [messageText, setMessageText] = useState('');
    const handleSendMessage = () => {
        if (!user) return;
        if (messageText.trim() === '') return;
        sendMessage(user?.friend_id, messageText);
        setMessageText('');
        onClose();
    };

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const date = new Intl.DateTimeFormat('ru-RU', options).format(new Date(user?.last_login || 0));

    const lastLogin = user?.last_login ? date : 'никогда не был в сети';

    return (
        <Dialog open={open}>
            <Box
                className={cn(styles.flex, styles.col, styles.justifyContentCenter, styles.dialog)}
                sx={{ width: '500px' }}
            >
                <Box className={cn(styles.flex, styles.justifyContentSpaceBetween, styles.dialogHeader)} sx={{ p: 2 }}>
                    <Typography variant="h5" component="div">
                        Новое сообщение
                    </Typography>
                    <IconButton size="small" onClick={onClose}>
                        <CloseOutlined />
                    </IconButton>
                </Box>
                <Divider variant="fullWidth" component="div" sx={{ width: '100%' }} />
                <Card
                    className={cn(
                        styles.flex,
                        styles.justifyContentCenter,

                        styles.dialogCard,
                        styles.col,
                    )}
                    component={'div'}
                >
                    <CardHeader
                        avatar={<Avatar src={user?.avatar && checkUrl(user.avatar)} />}
                        title={user?.full_name}
                        subheader={`Был в сети ${lastLogin}`}
                    />
                    <CardContent className={styles.flex} sx={{ width: '100%' }}>
                        <TextField
                            placeholder="Написать сообщение"
                            fullWidth
                            variant="outlined"
                            size="small"
                            multiline
                            maxRows={7}
                            minRows={5}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            onChange={(e) => setMessageText(e.target.value)}
                            value={messageText}
                        />
                    </CardContent>
                    <CardActions className={cn(styles.flex, styles.justifyContentEnd)} sx={{ width: '100%' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleSendMessage}
                            disabled={messageText === ''}
                        >
                            Отправить
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Dialog>
    );
};

export default memo(AddNewDialogue);
