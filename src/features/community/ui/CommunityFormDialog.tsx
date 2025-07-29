import React, { useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Box,
    IconButton,
    Avatar,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CommunityFormValues } from '../types/communityTypes';

interface CommunityFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

const CommunityFormDialog: React.FC<CommunityFormDialogProps> = ({ open, onClose, onSubmit }) => {
    const { control, handleSubmit, reset, watch, setValue } = useForm<CommunityFormValues>();
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const avatarFile = watch('avatar');
    const coverFile = watch('cover');

    const handleFormSubmit = (data: CommunityFormValues) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);

        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }
        if (data.cover) {
            formData.append('cover', data.cover);
        }

        onSubmit(formData);
        reset();
    };

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };

    const handleCoverClick = () => {
        coverInputRef.current?.click();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Создать сообщество
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    <Stack spacing={3}>
                        <Box
                            sx={{
                                height: 150,
                                borderRadius: 1,
                                overflow: 'hidden',
                                position: 'relative',
                                bgcolor: 'action.hover',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={handleCoverClick}
                        >
                            {coverFile ? (
                                <img
                                    src={URL.createObjectURL(coverFile)}
                                    alt="Превью обложки"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <>
                                    <AddPhotoAlternateIcon fontSize="large" color="action" />
                                    <Typography component="span">Добавить обложку</Typography>
                                    <input
                                        type="file"
                                        ref={coverInputRef}
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setValue('cover', e.target.files[0]);
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={avatarFile ? URL.createObjectURL(avatarFile) : undefined}
                                    sx={{ width: 80, height: 80, cursor: 'pointer' }}
                                    onClick={handleAvatarClick}
                                >
                                    <AddPhotoAlternateIcon fontSize="large" />
                                </Avatar>
                                <input
                                    type="file"
                                    ref={avatarInputRef}
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            setValue('avatar', e.target.files[0]);
                                        }
                                    }}
                                />
                            </Box>

                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Название обязательно' }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Название сообщества"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* Описание */}
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth multiline rows={4} label="Описание сообщества" />
                            )}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CommunityFormDialog;
