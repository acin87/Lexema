import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { FC, memo, SyntheticEvent } from 'react';

interface SnackBarProps {
    message: string | undefined;
    severity: 'error' | 'warning' | 'info' | 'success';
    open: boolean;
    onClose: (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => void;
}

const SnackBar: FC<SnackBarProps> = ({ message, severity, open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={4500} onClose={onClose}>
            <Alert sx={{ display: 'flex', alignItems: 'center' }} severity={severity} onClose={onClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default memo(SnackBar);
