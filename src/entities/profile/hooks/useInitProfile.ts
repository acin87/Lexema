import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import { useGetProfileQuery } from '../api/profileApi';
import { setProfile } from '../slices/profileSlice';

export const useInitProfile = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.auth.user_id);
    const {
        data: profile,
        isSuccess,
    } = useGetProfileQuery(
        { id: userId ?? 0 },
        {
            skip: !userId,
        },
    );
    useEffect(() => {
        if (isSuccess && profile) {
            dispatch(setProfile(profile));
        }
    }, [isSuccess, profile, dispatch]);
};
