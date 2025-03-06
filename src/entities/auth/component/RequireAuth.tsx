import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { loadState } from '../../../shared/utils/LocalStorage';
import { JWT_PERSISTENT_STATE } from '../../user/types/User';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    const jwt = loadState(JWT_PERSISTENT_STATE);

    if (!jwt) {
        return <Navigate to="/auth" replace />;
    }
    return children;
});
export default RequireAuth;
