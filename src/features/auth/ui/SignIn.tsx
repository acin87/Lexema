import { FC, memo, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthForm from './AuthForm';

/**
 * Пропсы для компонента SignIn
 */
interface SignInProps {
    onOpenSnackbar: (message: string) => void;
}
/**
 * Компонент для входа в систему
 * @param onOpenSnackbar - функция для открытия снэкбара
 * @returns компонент для входа в систему
 */
const SignIn: FC<SignInProps> = ({ onOpenSnackbar }) => {
    const { methods, onSubmit, isLoading, message, isError, handleClearError } = useAuthForm(false);

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
                        { name: 'password', label: 'Пароль', type: 'password', required: true },
                    ]}
                    onSubmit={onSubmit}
                    buttonText="Войти"
                    isLoading={isLoading}
                    status="signIn"
                />
            </FormProvider>
        </>
    );
};

export default memo(SignIn);
