import { FC, lazy, memo, Suspense } from 'react';
import LeftSkeleton from '../../../pages/Skeletons/LeftSideBar/LeftSkeleton';

const LeftSideBar = lazy(() => import('./LeftSideBar.tsx'));

const LeftSideBarAsync: FC = memo(() => {
    return (
        <Suspense fallback={<LeftSkeleton />}>
            <LeftSideBar />
        </Suspense>
    );
});
export default LeftSideBarAsync;
