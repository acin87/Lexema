import { Avatar } from '@mui/material';
import { FC, memo } from 'react';
import { Users } from '../../entities/user/types/User';
import style from './UserView.module.css';

export const UserView: FC<Users> = memo((user) => {
    console.log(user);
    return (
        <div className={style.header} style={{ backgroundImage: 'url("../../src/assets/images/1361476761_621333142.jpg")' }}>
            <div className={style.userInfoRow}>
                <div className={style.avatarBox}>
                    <Avatar src={user.image} alt={user.firstName} sx={{ height: 130, width: 130 }} />
                </div>
            </div>
        </div>
    );
});
