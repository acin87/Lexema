import { FC, memo, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthForm from './AuthForm';

/**
 * Пропсы для компонента SignUp
 */
interface SignUpProps {
    onOpenSnackbar: (message: string) => void;
}
/**
 * Компонент для регистрации пользователя
 * @param onOpenSnackbar - функция для открытия снэкбара
 * @returns компонент для регистрации пользователя
 */
const SignUp: FC<SignUpProps> = ({ onOpenSnackbar }) => {
    const { methods, onSubmit, isLoading, message, isError, handleClearError } = useAuthForm(true);

    useEffect(() => {
        if (isError && message) {
            onOpenSnackbar(message);
            handleClearError();
        }
    }, [onOpenSnackbar, isError, message, handleClearError]);

    return (
        <>
            <FormProvider {...methods}>
                <AuthForm
                    fields={[
                        { name: 'username', label: 'Логин', required: true },
                        { name: 'email', label: 'E-mail', required: true },
                        { name: 'password', label: 'Пароль', type: 'password', required: true },
                        { name: 'confirmpassword', label: 'Повторить пароль', type: 'password', required: true },
                    ]}
                    onSubmit={onSubmit}
                    buttonText="Зарегистрироваться"
                    isLoading={isLoading}
                    status="signUp"
                />
            </FormProvider>
        </>
    );
};

export default memo(SignUp);
