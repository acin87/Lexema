import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store/store';
import { selectUser, setUser } from '../../../entities/user/slice/userSlice';
import { User } from '../../../entities/user/types/UserTypes';
import { useGetProfileQuery, useUpdateProfileMutation } from '../api/profileApi';
import { Profile } from '../types/ProfileTypes';
import ProfileForm from './ProfileForm';

/**
 * Компонент для редактирования профиля пользователя
 * @returns JSX.Element
 */
const EditProfileTab = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const { data: profile } = useGetProfileQuery({ id: user.id });
    const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
    const handleSubmit = async (data: Profile) => {
        const formData = new FormData();

        formData.append('age', data.age.toString());
        formData.append('gender', data.gender);
        formData.append('phone', data.phone);
        formData.append('birth_date', data.birthDate);
        formData.append('address', JSON.stringify(data.address));
        formData.append('education', data.education);
        formData.append('company', JSON.stringify(data.company));
        formData.append('signature', data.signature);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);

        // Добавляем изображения, если они есть
        if (data.avatar instanceof File) {
            formData.append('avatar', data.avatar);
        }
        if (data.profile_image instanceof File) {
            formData.append('profile_image', data.profile_image);
        }

        try {
            const response = await updateProfile({ id: user.id, data: formData }).unwrap();
            if (response) {
                const userData: User = {
                    id: user.id,
                    username: response.username,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    full_name: response.full_name,
                    avatar: response.avatar,
                    profile_image: response.profile_image,
                    is_staff: user.is_staff,
                    is_superuser: user.is_superuser,
                    last_login: user.last_login,
                };
                dispatch(setUser(userData));
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 'md', mx: 'auto', p: 2 }}>
            <ProfileForm
                initialData={{
                    age: profile?.age,
                    gender: profile?.gender,
                    phone: profile?.phone,
                    birthDate: profile?.birthDate,
                    address: profile?.address,
                    education: profile?.education,
                    company: profile?.company,
                    images: profile?.images,
                    avatar: profile?.avatar,
                    profile_image: profile?.profile_image,
                    signature: profile?.signature,
                    first_name: profile?.first_name,
                    last_name: profile?.last_name,
                }}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess}
            />
        </Box>
    );
};

export default EditProfileTab;
