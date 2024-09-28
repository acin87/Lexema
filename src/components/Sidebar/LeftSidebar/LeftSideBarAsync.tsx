import { FC, lazy, memo, Suspense } from 'react';
import LeftSkeleton from '../../Skeletons/LeftSideBar/LeftSkeleton.tsx';

const LeftSideBar = lazy(() => import('./LeftSideBar.tsx'));

const LeftSideBarAsync: FC = memo(() => {
    return (
        <Suspense fallback={<LeftSkeleton />}>
            <LeftSideBar />
        </Suspense>
    );
});
export default LeftSideBarAsync;
