import { memo, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_PERSISTENT_STATE, AuthState } from '../slice/authSlice';
import { loadState } from '../../../shared/utils/LocalStorage';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    const jwt = loadState<AuthState>(AUTH_PERSISTENT_STATE)?.access ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt === null) {
            navigate('/auth');
        }
    }, [jwt, navigate]);

    return children;
});
export default RequireAuth;
