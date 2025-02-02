import { Paper } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import style from './FriendList.module.css';
import { useGetAllUsersQuery } from '../../../entities/user/api/userApi';
import { FriendView } from './FriendView';

const FriendList: FC = memo(() => {
    const usersFieldList = 'id,age,firstName,lastName,role,image,university';
    const [skipUser, setSkipUser] = useState(0);
    const { data: data } = useGetAllUsersQuery({ limit: 8, start: skipUser });

    const { ref, inView } = useInView({ threshold: 0.8 });
    useEffect(() => {
        if (inView) {
            setSkipUser(skipUser + 7);
        }
    }, [inView]);

    const userItem = data?.users.map((user, index) => {
        if (index + 1 === data?.users.length) {
            return <FriendView key={user.id} {...user} ref={ref}></FriendView>;
        }
        return <FriendView key={user.id} {...user}></FriendView>;
    });

    return (
        <Paper className={style.friendList}>
            <div className={style.header}></div>
            <div className={style.list}>{userItem}</div>
        </Paper>
    );
});
export default FriendList;
