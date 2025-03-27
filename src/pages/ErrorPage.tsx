import { FC, memo } from 'react';
import useDocumentTitle from '../shared/hooks/useDocumentTitle';

const ErrorPage: FC = memo(() => {
    useDocumentTitle('Lexema | Ошибка');
    return <>Error</>;
});
export default ErrorPage;
