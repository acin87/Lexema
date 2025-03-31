import {
    useAddFriendMutation,
    useCancelFriendRequestMutation,
    useRemoveFriendMutation,
} from '../../profile/api/profileApi';
const useFriendActions = () => {
    const [addFriend, { isSuccess: isAdded, isError: isErrorAdding }] = useAddFriendMutation();
    const [removeFriend, { isSuccess: isRemoved, isError: isErrorRemoving }] = useRemoveFriendMutation();
    const [cancelFriendRequest, { isSuccess: isCanceled, isError: isErrorCanceling }] =
        useCancelFriendRequestMutation();

    const handleAddFriend = async (id: number) => {
        await addFriend({ id });
    };

    const handleRemoveFriend = async (id: number) => {
        await removeFriend({ id });
    };

    const handleCancelFriendRequest = async (id: number) => {
        await cancelFriendRequest({ id });
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
    };
};

export default useFriendActions;
