import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { FC, memo, SyntheticEvent } from 'react';

interface SnackBarProps {
    message: string | undefined;
    severity: 'error' | 'warning' | 'info' | 'success';
    open: boolean;
    onClose: (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
    autoHideDuration?: number;
}

const SnackBar: FC<SnackBarProps> = ({ message, severity, open, onClose, autoHideDuration = 4500 }) => {
    return (
        <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
            <Alert sx={{ display: 'flex', alignItems: 'center' }} severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default memo(SnackBar);
