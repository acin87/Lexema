import { Fragment } from 'react/jsx-runtime';
import Auth from '../../features/auth/ui/Auth';
import useDocumentTitle from '../../shared/hooks/useDocumentTitle';

const AuthPage = () => {
    useDocumentTitle('Lexema | Авторизация');
    return (
        <Fragment>
            <Auth />
        </Fragment>
    );
};

export default AuthPage;
