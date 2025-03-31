import { lazy, memo, Suspense } from 'react';
import ProfileSkeleton from '../../features/profile/ui/ProfileSkeleton';

const ProfilePage = lazy(() => import('./ProfilePage'));

/**
 * Компонент асинхронной загрузки страницы профиля
 * @returns JSX.Element
 */
const ProfilePageAsync = () => {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfilePage />
        </Suspense>
    );
};

export default memo(ProfilePageAsync);
