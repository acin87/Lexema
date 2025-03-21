import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { FC, Fragment, memo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AuthFormProps {
    fields: Array<{
        name: string;
        label: string;
        type?: string;
        required?: boolean;
    }>;
    onSubmit: () => void;
    buttonText: string;
    status: 'signIn' | 'signUp';
    isLoading?: boolean;
}

const AuthForm: FC<AuthFormProps> = ({ fields, onSubmit, buttonText, isLoading, status }) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            <form onSubmit={onSubmit}>
                {fields.map((field) => (
                    <Box key={field.name} sx={{ position: 'relative', width: '100%', margin: '1rem 0' }}>
                        {field.type === 'password' ? (
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor={field.name + '-' + status}>{field.label}</InputLabel>
                                <Controller
                                    name={field.name}
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Fragment>
                                            <OutlinedInput
                                                id={field.name + '-' + status}
                                                type={showPassword ? 'text' : 'password'}
                                                value={value}
                                                onChange={onChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label={field.label}
                                                required={field.required}
                                                error={!!error}
                                            />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </Fragment>
                                    )}
                                />
                            </FormControl>
                        ) : (
                            <Controller
                                name={field.name}
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        id={field.name + '-' + status}
                                        label={field.label}
                                        variant="outlined"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        required={field.required}
                                        error={!!error}
                                        helperText={error?.message}
                                    />
                                )}
                            />
                        )}
                    </Box>
                ))}
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : buttonText}
                </Button>
            </form>
        </>
    );
};

export default memo(AuthForm);
