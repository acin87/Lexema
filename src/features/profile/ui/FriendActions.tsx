import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';
import useFriendActions from '../../friends/hooks/useFriendActions';
import { FriendStatus } from '../../friends/types/FriendTypes';
import { Profile } from '../types/ProfileTypes';
import AddFriendButton from './AddFriendButton';
import DeleteFriendButton from './DeleteFriendButton';
import styles from './Profile.module.css';

/**
 * Компонент для отображения действий с пользователем
 * @param user_id - Идентификатор пользователя
 * @param profile - Профиль пользователя
 */
interface FriendActionsProps {
    user_id: number;
    profile: Profile | undefined;
}

/**
 * Компонент для отображения действий с пользователем
 * @param user_id - Идентификатор пользователя
 * @param profile - Профиль пользователя
 */
const FriendActions: FC<FriendActionsProps> = ({ user_id, profile }) => {
    const { handleAddFriend, handleRemoveFriend, handleCancelFriendRequest } = useFriendActions();
    const friendStatusCode = profile?.friend_status?.code;

    const isFriend = profile?.is_friend;
    const friendship_id = profile?.friendship_id || 0;

    // Основные состояния
    switch (friendStatusCode) {
        case FriendStatus.ACCEPTED:
            return isFriend ? (
                <DeleteFriendButton
                    id={friendship_id}
                    handleRemoveFriend={handleRemoveFriend}
                    text="Удалить из друзей"
                    friendStatus={FriendStatus.ACCEPTED}
                />
            ) : (
                <Box className={styles.friendStatusContainer}>
                    <PersonAddAlt1Icon color="primary" />
                    <Typography variant="body2">Запрос отправлен</Typography>
                </Box>
            );

        case FriendStatus.PENDING:
            return (
                <DeleteFriendButton
                    id={friendship_id}
                    handleRemoveFriend={handleCancelFriendRequest}
                    text="Отменить запрос"
                    friendStatus={FriendStatus.PENDING}
                />
            );

        case FriendStatus.REJECTED:
            return (
                <Box className={styles.friendStatusContainer}>
                    <PersonAddDisabledIcon color="primary" />
                    <Typography variant="body2">Запрос отклонен</Typography>
                </Box>
            );

        default:
            return <AddFriendButton id={user_id} handleAddFriend={handleAddFriend} />;
    }
};

export default memo(FriendActions);
