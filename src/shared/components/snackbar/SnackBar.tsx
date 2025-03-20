import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material';
import { FC, Fragment, memo, SyntheticEvent } from 'react';

interface SnackBarProps {
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
    open: boolean;
    onOpen: () => void;
}

const SnackBar: FC<SnackBarProps> = ({ message, severity, open, onOpen }) => {
    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        onOpen();
    };

    const CloseButton = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar open={open} autoHideDuration={350} onClose={handleCloseSnackbar}>
           
                <Alert sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} severity={severity}>{message}  {CloseButton}</Alert>
              
            
        </Snackbar>
    );
};

export default memo(SnackBar);
