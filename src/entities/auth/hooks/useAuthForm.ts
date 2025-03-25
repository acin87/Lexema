import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../../../entities/auth/api/AuthApi';
import { ApiError, isAuthApiError } from '../../../entities/auth/utils/AuthUtils';

export const useAuthForm = (isSignUp: boolean) => {
    const methods = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const [login, { isError: isLoginError, error: loginError, isLoading: isLoginLoading }] = useLoginMutation();
    const [register, { isError: isRegisterError, isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

    const isLoading = isLoginLoading || isRegisterLoading;

    const handleApiError = useCallback(
        (error: unknown) => {
            if (isAuthApiError(error)) {
                const apiError = error as ApiError;

                if (apiError.status === 'FETCH_ERROR') {
                    setMessage('Ошибка при запросе. Сервер не отвечает.');
                    setIsError(true);
                } else if (typeof apiError.status === 'number' && apiError.data) {
                    Object.keys(apiError.data).forEach((field) => {
                        const formField = field as string;
                        if (Array.isArray(apiError.data?.[formField])) {
                            methods.setError(
                                formField,
                                { type: 'manual', message: apiError.data?.[formField].join(', ') },
                                { shouldFocus: true },
                            );
                            setMessage(apiError.data?.[formField].join(', '));
                            setIsError(true);
                        }
                    });
                }
            } else {
                setMessage('Произошла неизвестная ошибка.');
                setIsError(true);
            }
        },
        [methods],
    );

    const handleAuth = async (data: FieldValues) => {
        try {
            if (isSignUp) {
                if (data.password !== data.confirmpassword) {
                    methods.setError('confirmpassword', { type: 'manual', message: 'Пароли не совпадают' });
                    return;
                }
                await register({ username: data.username, password: data.password, email: data.email }).unwrap();
                await login({ username: data.username, password: data.password }).unwrap();
            } else {
                await login({ username: data.username, password: data.password }).unwrap();
            }
            navigate('/', { replace: true });
        } catch (error) {
            handleApiError(error);
        }
    };

    const onSubmit = methods.handleSubmit(handleAuth);

    const handleClearError = () => {
        setIsError(false);
        setMessage('');
    };

    useEffect(() => {
        const isError = isSignUp ? isRegisterError : isLoginError;
        const error = isSignUp ? registerError : loginError;
        if (isError && error) {
            handleApiError(error);
        }
    }, [isSignUp, isRegisterError, isLoginError, registerError, loginError, handleApiError]);

    return { methods, onSubmit, isLoading, message, isError, handleClearError };
};


