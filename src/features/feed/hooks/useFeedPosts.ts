import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiError, isApiError } from '../../../app/api/Utils';
import { AppDispatch, RootState } from '../../../app/store/store';
import { useGetMainPostsQuery, useGetProfilePostsQuery } from '../../../entities/post/api/postApi ';
import { addPosts, setPosts, setSkip } from '../slice/feedSlice';
import { FeedType } from '../types/FeedTypes';

/**
 * Хук для получения постов для главной страницы, профиля или группы
 * @param feedType - тип ленты (main, profile)
 * @param profileOrGroupOwnerId - id профиля или группы
 * @returns Object - объект с полями:
 *   - posts: массив постов
 *   - isError: флаг ошибки
 *   - ref: ref для пересечения наблюдателя
 *   - isSuccess: флаг успешности запроса
 *   - totalCount: общее количество постов
 *   - isFetching: флаг загрузки
 *   - isLoading: флаг загрузки
 */
const useFeedPosts = (feedType: FeedType, profileOrGroupOwnerId?: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { posts, skip } = useSelector((state: RootState) => state.feed[feedType]);

    const baseParams = { limit: 5, offset: skip };

    const mainQuery = useGetMainPostsQuery({ ...baseParams }, { skip: feedType !== 'main' });
    const profileQuery = useGetProfilePostsQuery(
        { ...baseParams, profileOrGroupOwnerId },
        { skip: feedType !== 'profile'},
    );
        const friendQuery = useGetProfilePostsQuery(
        { ...baseParams, profileOrGroupOwnerId },
        { skip: feedType !== 'friend'},
    );

    const getQuery = () => {
        switch (feedType) {
            case 'profile':
                return profileQuery;
            case 'friend':
                return friendQuery;
            // case 'group':
            //     return useGetGroupPostsQuery;
            default:
                return mainQuery;
        }
    };

    const { data: response, isError, isSuccess, isFetching, isLoading, error } = getQuery();

    const { ref, inView } = useInView({ threshold: 0.8 }); //react-intersection-observer

    const totalCount = response ? response.count : 0;

    useEffect(() => {
        if (response) {
            if (skip === 0) {
                dispatch(setPosts({ feedType, posts: response.results }));
            }
            if (response.results.length > 0) {
                dispatch(addPosts({ feedType, posts: response.results }));
            }
        }
    }, [response, dispatch, feedType, skip]);

    useEffect(() => {
        if (response) {
            if (inView && !isFetching && !isLoadingMore && response.results.length < response.count) {
                setIsLoadingMore(true);
                const newSkip = skip + 5;
                dispatch(setSkip({ feedType, skip: newSkip }));
            }
        }
    }, [inView, response, isLoadingMore, isFetching, feedType, skip, dispatch]);

    useEffect(() => {
        if (!isFetching) {
            setIsLoadingMore(false);
        }
    }, [isFetching]);

    useEffect(() => {
        if (isError && isApiError(error)) {
            const apiError = error as ApiError;
            if (apiError.status === 401) {
                navigate('/auth');
            }
        }
    }, [isError, error, navigate]);

    return { posts, isError, ref, isSuccess, totalCount, isFetching, isLoading, error };
};
export default useFeedPosts;
