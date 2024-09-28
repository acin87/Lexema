import { FC, lazy, memo, Suspense } from 'react';
import LeftSkeleton from '../../../pages/Skeletons/LeftSideBar/LeftSkeleton.tsx';

const RightSideBar = lazy(() => import('./RightSideBar.tsx'));

const RightSideBarAsync: FC = memo(() => {
    return (
        <Suspense fallback={<LeftSkeleton />}>
            <RightSideBar />
        </Suspense>
    );
});
export default RightSideBarAsync;
