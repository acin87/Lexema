import { Avatar, Box, Divider, Skeleton } from '@mui/material';
import cn from 'classnames';
import { FC } from 'react';
import styles from './Chat.module.css';

interface MessageSkeletonProps {
    sender: boolean;
}

const MessageSkeleton: FC<MessageSkeletonProps> = ({ sender }) => {
    return (
        <Box sx={{ display: 'flex', width: '100%', mb: 1, p: 3, gap: 2 }}>
            {sender && (
                <Box className={cn(styles.flex, styles.alignItemsStart)}>
                    <Avatar />
                </Box>
            )}
            <Box
                className={cn(styles.flex, styles.col, styles.justifyContentCenter, styles.chatMessageWrapper)}
                sx={{ backgroundColor: 'secondary.light', width: '100%' }}
            >
                <Box
                    className={cn(styles.flex, styles.alignItemsCenter, styles.justifyContentSpaceBetween)}
                    sx={{ width: '100%', p: 1, px: 2 }}
                >
                    <Skeleton variant="rectangular" width={100} height={15} />
                    <Skeleton variant="rectangular" width={100} height={15} />
                </Box>
                <Divider variant="fullWidth" sx={{ borderColor: 'rgb(0 0 0 / 25%)', width: '100%' }} />
                <Box sx={{ p: 2, width: '100%' }}>
                    <Skeleton variant="rectangular" height={200} sx={{width: '100%'}}/>
                </Box>
            </Box>
            {!sender && (
                <Box
                    sx={{ display: 'flex', alignItems: 'flex-start' }}
                    className={cn(styles.flex, styles.alignItemsStart)}
                >
                    <Avatar />
                </Box>
            )}
        </Box>
    );
};

export default MessageSkeleton;
