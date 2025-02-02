import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { JWT_PERSISTENT_STATE } from '../../entities/user/types/User';
import { loadState } from '../../shared/utils/LocalStorage';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    const jwt = loadState(JWT_PERSISTENT_STATE);

    if (!jwt) {
        return <Navigate to="/auth" replace />;
    }
    return children;
});
export default RequireAuth;
