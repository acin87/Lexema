import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import { uiActions } from '../../app/store/uiSlice';

const useScrollPosition = (page: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const scrollPosition = useSelector((state: RootState) => state.ui.scrollPositions[page]);

    useEffect(() => {
        if (scrollPosition !== undefined) {
            window.scrollTo(0, scrollPosition);
        }

        const handleScroll = () => {
            dispatch(uiActions.setScrollPosition({ page, position: window.scrollY }));
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch, page, scrollPosition]);
};
export default useScrollPosition;
