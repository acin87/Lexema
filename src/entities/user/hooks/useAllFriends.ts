import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetAllFriendsQuery } from '../api/userApi';
import { addFriends } from '../slices/friendsSlice';

const useAllFriends = (userId: number) => {
    const [skipUser, setSkipUser] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
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

    const totalCount = response ? response.totalCount : 0;

    useEffect(() => {
        if (response) {
            const newUsers = response.users.filter((user) => !friends.some((friend) => friend.id === user.id));
            if (newUsers.length > 0) {
                dispatch(addFriends(newUsers));
            }
        }
    }, [response, dispatch, friends]);

    useEffect(() => {
        if (response) {
            if (inView && !isFetching && !isLoadingMore && response.users.length < response.totalCount) {
                setIsLoadingMore(true);
                setSkipUser(skipUser + 9);
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
