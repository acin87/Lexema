import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardHeader, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../entities/user/slice/userSlice';
import { User } from '../../../entities/user/types/UserTypes';
import { useMessageActions } from '../hooks/useMessageActions';

interface DialogueItemProps {
    sender: Pick<User, 'id' | 'full_name' | 'avatar' | 'username'>;
    recipient: Pick<User, 'id' | 'full_name' | 'avatar' | 'username'>;
    subHeader: string | undefined;
}


/**
 * Компонент для отображения элемента диалога
 * @param sender - отправитель сообщения
 * @param recipient - получатель сообщения
 * @param subHeader - текст сообщения
 * @returns JSX.Element
 */
const DialogueItem: FC<DialogueItemProps> = ({ sender, subHeader, recipient }) => {
    const userId = useSelector(selectUserId);
    const {deleteAllMessages, markAllMessagesAsRead} = useMessageActions()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const itsMeSender = userId === sender.id;
    const dialogSender = itsMeSender ? recipient : sender;

    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigate = () => {
        navigate(`/messenger/${dialogSender.id}`);
    };

    return (
        <>
            <Card
                sx={{
                    boxShadow: 'none',
                    background: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    mb: '.25rem',
                    '&:hover': { backgroundColor: 'secondary.light' },
                    transition: 'all .2s ease-in-out',
                }}
                onClick={handleNavigate}
            >
                <CardHeader
                    sx={{
                        '& .MuiCardHeader-content': { minWidth: 0 },
                        '& .MuiCardHeader-action': { alignItems: 'center', opacity: 0, pr: 1 },
                        '&:hover .MuiCardHeader-action': { opacity: 1 },
                    }}
                    avatar={<Avatar src={itsMeSender ? recipient.avatar : sender.avatar} />}
                    title={
                        <Typography variant="subtitle2" fontWeight="bold">
                            {itsMeSender
                                ? `${recipient.full_name} (${recipient.username})`
                                : `${sender.full_name} (${sender.username})`}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            variant="subtitle2"
                            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                        >
                            {itsMeSender && 'Вы:'} {subHeader}
                        </Typography>
                    }
                    action={
                        <IconButton
                            onClick={(e) => {
                                handleClick(e);
                            }}
                            size="small"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    }
                />
            </Card>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={()=> markAllMessagesAsRead(dialogSender.id)}>Пометить все прочитанными</MenuItem>
                <MenuItem onClick={()=> deleteAllMessages(dialogSender.id)}>Удалить переписку</MenuItem>
            </Menu>
        </>
    );
};

export default DialogueItem;
