import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';
import { Button, InputAdornment, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useSendMessageMutation } from '../api/messengerApi';

interface AddMessageProps {
    recipient_id: number;
}

const AddMessage: FC<AddMessageProps> = ({ recipient_id }) => {
    const [focus, setFocus] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [sendMessage] = useSendMessageMutation();

    const handleSendMessage = () => {
        sendMessage({ recipient_id, content: messageText });
        setMessageText('');
    };
    return (
        <>
            <TextField
                placeholder="Написать сообщение"
                fullWidth
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <AddCommentIcon fontSize="small" color="primary" />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="outlined"
                size="small"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <Button color="primary" sx={{ ml: 1 }} onClick={handleSendMessage} disabled={messageText === ''}>
                <SendIcon fontSize="small" sx={{ color: focus ? 'error.main' : 'primary.main' }} />
            </Button>
        </>
    );
};

export default AddMessage;
