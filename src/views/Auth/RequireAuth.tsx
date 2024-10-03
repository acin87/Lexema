import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = memo(({ children }: { children: ReactNode }) => {
    if (true) {
        //TODO Переделать
        return <Navigate to="/auth" replace></Navigate>;
    }
    return children;
});
export default RequireAuth;
