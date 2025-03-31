import { useGetProfileQuery } from '../api/profileApi';

const useProfile = (userId: number) => {
    const { data: response, isLoading, isFetching, isError, isSuccess } = useGetProfileQuery({ id: userId });
    return { response, isLoading, isFetching, isError, isSuccess };
};

export default useProfile;
