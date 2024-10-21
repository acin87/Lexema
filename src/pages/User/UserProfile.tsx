import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';
import { User } from '../../app/reducers/user/usersTypes';
import { UserView } from '../../views/User/UserView';
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
