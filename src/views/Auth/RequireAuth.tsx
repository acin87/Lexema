import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { JWT_PERSISTENT_STATE } from '../../app/reducers/user/usersTypes';
import { loadState } from '../../app/util/LocalStorage';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    const jwt = loadState(JWT_PERSISTENT_STATE);

    if (!jwt) {
        return <Navigate to="/auth" replace></Navigate>;
    }
    return children;
});
export default RequireAuth;
