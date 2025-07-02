import { useState } from 'react';
import {
    useAcceptFriendRequestMutation,
    useAddFriendMutation,
    useCancelFriendRequestMutation,
    useRemoveFriendMutation,
} from '../api/friendsApi';

const useFriendActions = () => {
    const [addFriend, { isSuccess: isAdded, isError: isErrorAdding }] = useAddFriendMutation();
    const [removeFriend, { isSuccess: isRemoved, isError: isErrorRemoving }] = useRemoveFriendMutation();
    const [cancelFriendRequest, { isSuccess: isCanceled, isError: isErrorCanceling }] =
        useCancelFriendRequestMutation();
    const [acceptFriendRequest, { isSuccess: isAccepted, isError: isErrorAcepting }] = useAcceptFriendRequestMutation();
    const [friendship_id, setFriendshipId] = useState<number | undefined>(0);
    const [status, setStatus] = useState<{ code: number; name: string } | undefined>();

    const handleAddFriend = async (id: number) => {
        const response = await addFriend({ id }).unwrap();
        setFriendshipId(response.friendship_id);
        setStatus(response.status_data);
    };

    const handleRemoveFriend = async (id: number) => {
        await removeFriend({ id });
        setFriendshipId(0);
        setStatus(undefined);
    };

    const handleCancelFriendRequest = async (id: number) => {
        await cancelFriendRequest({ id });
    };

    const handleAcceptFriendRequest = async (id: number) => {
        await acceptFriendRequest({ id });
    };

    return {
        handleAddFriend,
        handleRemoveFriend,
        isAdded,
        isErrorAdding,
        isRemoved,
        isErrorRemoving,
        handleCancelFriendRequest,
        isCanceled,
        isErrorCanceling,
        handleAcceptFriendRequest,
        isAccepted,
        isErrorAcepting,
        friendship_id,
        status,
    };
};

export default useFriendActions;
