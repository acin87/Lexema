import { FC, lazy, Suspense } from 'react';

const MessengerPage = lazy(() => import('./MessengerPage'));

const MessengerPageAsync: FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MessengerPage />
        </Suspense>
    );
};

export default MessengerPageAsync;
