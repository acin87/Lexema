import Auth from '../../features/auth/ui/Auth';
import useDocumentTitle from '../../shared/hooks/useDocumentTitle';


/**
 * Страница авторизации
 */
const AuthPage = () => {
    useDocumentTitle('Lexema | Авторизация');
    return (
        <>
            <Auth />
        </>
    );
};

export default AuthPage;
