import { useEffect } from 'react';

/**
 * Хук для изменения заголовка страницы
 * @param title - заголовок страницы
 */
const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useDocumentTitle;    
