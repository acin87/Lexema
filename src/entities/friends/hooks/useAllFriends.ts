import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetAllFriendsQuery } from '../api/friendsApi';
import { addFriends, setSkipUser } from '../slices/friendsSlice';
import { Friend } from '../types/FriendTypes';

const useAllFriends = () => {
    const skipUser = useSelector((state: RootState) => state.friends.skipUser);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const userId = useSelector((state: RootState) => state.auth.user_id ?? 0);
    const {
        data: response,
        isFetching,
        isLoading,
        isSuccess,
        isUninitialized,
    } = useGetAllFriendsQuery({ limit: 9, start: skipUser, userId: userId });
    const dispatch = useDispatch<AppDispatch>();
    const friends = useSelector((state: RootState) => state.friends.friends);

    const { ref, inView } = useInView({ threshold: 0.8, rootMargin: '0px 0px 200px 0px' });

    const totalCount = response ? response.count : 0;

    useEffect(() => {
        if (response) {
            const newUsers = response.results.filter(
                (friend: Friend) => !friends.some((friends: Friend) => friend.id === friends.id),
            );
            if (newUsers.length > 0) {
                dispatch(addFriends(newUsers));
            }
        }
    }, [response, dispatch, friends]);

    useEffect(() => {
        if (response) {
            if (inView && !isFetching && !isLoadingMore && response.results.length < response.count) {
                setIsLoadingMore(true);
                const newSkipUser = skipUser + 9;
                dispatch(setSkipUser(newSkipUser));
            }
        }
    }, [inView, isFetching, isLoadingMore, skipUser, response, dispatch]);

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false);
        }
    }, [isFetching]);

    return { friends, ref, isFetching, isLoading, isSuccess, isUninitialized, totalCount };
};

export default useAllFriends;
