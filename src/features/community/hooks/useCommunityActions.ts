import {
    useCreateCommunityMutation,
    useDeleteCommunityMutation,
    useJoinCommunityMutation,
    useLeaveCommunityMutation,
} from '../api/communityApi';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { isApiError } from '../../../app/api/Utils';

export const useCommunityActions = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [createCommunity] = useCreateCommunityMutation();
    const [joinCommunity] = useJoinCommunityMutation();
    const [leaveCommunity] = useLeaveCommunityMutation();
    const [deleteCommunity] = useDeleteCommunityMutation();

    const handleCreateCommunity = useCallback(
        async (formData: FormData) => {
            try {
                await createCommunity(formData).unwrap();
                enqueueSnackbar('Сообщество успешно создано', { variant: 'success' });
                return true;
            } catch (err) {
                enqueueSnackbar('Не удалось создать сообщество', { variant: 'error' });
                console.error('Failed to create community:', err);
                return false;
            }
        },
        [createCommunity, enqueueSnackbar],
    );

    const handleJoinCommunity = useCallback(
        async (communityId: number) => {
            try {
                await joinCommunity({ communityId }).unwrap();
                enqueueSnackbar('Вы успешно вступили в сообщество', { variant: 'success' });
                return true;
            } catch (err) {
                if (isApiError(err)) {
                    enqueueSnackbar(err.data?.detail, { variant: 'error' });
                }
                console.error('Failed to join community:', err);
                return false;
            }
        },
        [joinCommunity, enqueueSnackbar],
    );

    const handleLeaveCommunity = useCallback(
        async (communityId: number) => {
            try {
                await leaveCommunity({ communityId }).unwrap();
                enqueueSnackbar('Вы вышли из сообщества', { variant: 'info' });
                return true;
            } catch (err) {
                if (isApiError(err)) {
                    enqueueSnackbar(err.data?.detail, { variant: 'error' });
                }
                console.error('Failed to leave community:', err);
                return false;
            }
        },
        [leaveCommunity, enqueueSnackbar],
    );
    const handleDeleteCommunity = useCallback(
        async (communityId: number) => {
            try {
                await deleteCommunity(communityId).unwrap();
                enqueueSnackbar('Сообщество успешно удалено', { variant: 'success' });
                return true;
            } catch (err) {
                if (isApiError(err)) {
                    enqueueSnackbar(err.data?.detail, { variant: 'error' });
                }
                console.error('Failed to delete community:', err);
                return false;
            }
        },
        [deleteCommunity, enqueueSnackbar],
    );

    return {
        createCommunity: handleCreateCommunity,
        joinCommunity: handleJoinCommunity,
        leaveCommunity: handleLeaveCommunity,
        deleteCommunity: handleDeleteCommunity,
    };
};
