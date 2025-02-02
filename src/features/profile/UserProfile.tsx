import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../entities/user/api/userApi';
import { User } from '../../entities/user/types/User';
import { UserView } from './UserView';
import style from './User.module.css';

const UserProfile: FC = memo(() => {
    const { id } = useParams();
    const { data: user } = useGetUserByIdQuery({ id: Number(id) });

    return (
        <div className={style.profileWrapper}>
            <UserView {...(user as User)} />
        </div>
    );
});
export default UserProfile;
