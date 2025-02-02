import { useGetUserByIdQuery } from '../api/userApi';

const useProfile = (userId: number) => {
    const { data: user } = useGetUserByIdQuery({id: userId});
    return {user};
};

export default useProfile;
