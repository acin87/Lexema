import { FC, lazy, Suspense } from 'react';

const DialouesPage = lazy(() => import('./DialoguesPage'));

const DialoguesPageAsync: FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DialouesPage />
        </Suspense>
    );
};

export default DialoguesPageAsync;
