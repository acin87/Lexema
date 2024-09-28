import { FC, lazy, memo, Suspense } from 'react';
import RightSkeleton from '../../Skeletons/RightSideBar/RightSkeleton.tsx';
const RightSideBar = lazy(() => import('./RightSideBar.tsx'));

const RightSideBarAsync: FC = memo(() => {
    return (
        <Suspense fallback={<RightSkeleton />}>
            <RightSideBar />
        </Suspense>
    );
});
export default RightSideBarAsync;
