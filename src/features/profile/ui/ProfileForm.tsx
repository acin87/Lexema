import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BASEURL } from '../../../app/api/ApiConfig';
import { Profile } from '../types/ProfileTypes';

/**
 * Specifies the props for the ProfileForm component.
 *
 * @property initialData - Optional initial profile data to populate the form, can be a partial Profile object.
 * @property onSubmit - Callback function that is triggered when the form is submitted, receives the complete Profile data.
 */
interface ProfileFormProps {
    initialData?: Partial<Profile>;
    onSubmit: (data: Profile) => void;
    isLoading?: boolean;
    isSuccess?: boolean;
}
type Gender = 'male' | 'female';
const genderOptions: { value: Gender; label: string }[] = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
];

const Input = styled('input')({
    display: 'none',
});

/**
 * React компонента формы для редактирования профиля пользователя.
 * Предоставляет поля ввода для основной информации: возраст, пол, телефон, дата рождения,
 * а также возможность загрузки аватара и фонового изображения профиля.
 * Поддерживает интеграцию с формой и обработчиком сабмина через useForm из react-hook-form.
 *
 * @param initialData Начальные данные профиля для заполнения формы.
 * @param onSubmit Функция-обработчик, вызывается при успешной отправке формы.
 * @returns JSX элемент формы профиля, рендеримый внутри Paper.
 */
const ProfileForm: FC<ProfileFormProps> = ({ initialData, onSubmit, isLoading, isSuccess }) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Profile>({
        defaultValues: {
            age: initialData?.age ?? 0,
            gender: initialData?.gender ?? 'male',
            phone: initialData?.phone ?? '',
            birthDate: initialData?.birthDate ?? '',
            address: initialData?.address ?? '',
            education: initialData?.education ?? '',
            company: initialData?.company ?? '',
            profile_image: initialData?.profile_image ?? '',
            avatar: initialData?.avatar ?? '',
            signature: initialData?.signature ?? '',
            first_name: initialData?.first_name ?? '',
            last_name: initialData?.last_name ?? '',
        },
    });

    const avatarFile = watch('avatar');
    const backgroundFile = watch('profile_image');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Profile) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setValue(field, file, { shouldValidate: true });
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Редактирование профиля
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    {/* Аватар */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            src={
                                avatarFile
                                    ? typeof avatarFile === 'string'
                                        ? BASEURL + avatarFile
                                        : URL.createObjectURL(avatarFile)
                                    : ''
                            }
                            sx={{ width: 80, height: 80 }}
                        />
                        <label htmlFor="avatar-upload">
                            <Input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'avatar')}
                            />
                            <Button variant="contained" component="span">
                                Загрузить аватар
                            </Button>
                        </label>
                    </Box>

                    {/* Фон профиля */}
                    <Box
                        sx={{
                            height: 150,
                            bgcolor: 'grey.200',
                            borderRadius: 1,
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundImage: backgroundFile
                                ? `url(${
                                      typeof backgroundFile === 'string'
                                          ? BASEURL + backgroundFile
                                          : URL.createObjectURL(backgroundFile)
                                  })`
                                : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <label htmlFor="background-upload" style={{ position: 'absolute', bottom: 16, right: 16 }}>
                            <Input
                                id="background-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'profile_image')}
                            />
                            <Button variant="contained" component="span">
                                Загрузить фон
                            </Button>
                        </label>
                    </Box>

                    {/* Основные поля */}
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
                        <Controller
                            name="first_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Имя"
                                    fullWidth
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                />
                            )}
                        />

                        <Controller
                            name="last_name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Фамилия"
                                    fullWidth
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                    </Box>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
                        <Controller
                            name="age"
                            control={control}
                            rules={{ min: 0, max: 150 }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Возраст"
                                    type="number"
                                    fullWidth
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                            )}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="gender-label">Пол</InputLabel>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select {...field} labelId="gender-label" label="Пол">
                                        {genderOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Box>

                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <TextField {...field} label="Телефон" fullWidth />}
                        />

                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Дата рождения"
                                    type="date"
                                    fullWidth
                                    slotProps={{ inputLabel: { shrink: true } }}
                                />
                            )}
                        />
                    </Box>
                    <Controller
                        name="signature"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Подпись" fullWidth />}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Адрес" fullWidth />}
                    />

                    <Controller
                        name="education"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Образование" fullWidth />}
                    />

                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Место работы" fullWidth />}
                    />

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        {isLoading ? <CircularProgress /> :  'Сохранить изменения'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
};

export default ProfileForm;
