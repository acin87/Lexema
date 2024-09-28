import { FC, lazy, memo, Suspense } from 'react';
import ContentWrapper from '../Skeletons/ContentWrapper/ContentWrapper.tsx';

const HomePage = lazy(() => import('./HomePage.tsx'));

const HomePageAsync: FC = memo(() => {
    return (
        <Suspense fallback={<ContentWrapper />}>
            <HomePage></HomePage>
        </Suspense>
    );
});

export default HomePageAsync;
