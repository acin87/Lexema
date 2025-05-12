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

    const handleAddFriend = async (id: number) => {
        await addFriend({ id });
    };

    const handleRemoveFriend = async (id: number) => {
        await removeFriend({ id });
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
    };
};

export default useFriendActions;
