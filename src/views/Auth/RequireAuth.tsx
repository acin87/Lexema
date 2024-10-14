import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { loadState } from '../../app/util/LocalStorage';
import { JWT_PERSISTENT_STATE } from '../../app/reducers/auth/authTypes';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    const jwt = loadState(JWT_PERSISTENT_STATE);

    if (!jwt) {
        return <Navigate to="/auth" replace></Navigate>;
    }
    return children;
});
export default RequireAuth;
