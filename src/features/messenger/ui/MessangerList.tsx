import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    position: 'static',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 1.25rem 0 rgba(0, 0, 0, .1)',
    },
    '&:hover .iconInline': {
        right: '-1.25rem',
    },
    padding: 0,
}));

const StyledListInline = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    right: '-9rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '0 1.875rem',
    lineHeight: '3.875rem',
    transition: 'all 0.3s ease-in-out',
    float: 'right',
    backgroundColor: theme.palette.background.paper,
    gap: theme.spacing(1),
}));

const StyledMessageDetails = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    right: '0',
    left: 'auto',
    zIndex: 6,
    display: 'block',
    height: '100%',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: theme.palette.background.paper,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: 'rgba(80,181,255,.2)',
    borderRadius: '5px',
}));

const MessangerList: React.FC = () => {
    const [show, setShow] = useState(false);

    return (
        <Paper sx={{ flex: '0 0 auto', width: '75%', py: 1, position: 'relative' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                <TextField
                    size="small"
                    variant="outlined"
                    sx={{ width: '40ch' }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
            <Divider />
            <List sx={{ position: 'static', display: 'inline-block', width: '100%', overflow: 'hidden' }}>
                <StyledListItem onClick={() => setShow(true)}>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: '.938rem 1.25rem',
                            position: 'relative',
                        }}
                    >
                        <ListItemText primary="UserName" sx={{ width: '30%', flexGrow: 1 }} />
                        <ListItemText sx={{ width: '70%', flexGrow: 2 }}>
                            <Typography variant="body2" color="primary.main">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni ...
                            </Typography>
                        </ListItemText>
                        <StyledListInline className="iconInline">
                            <Tooltip title="Удалить чат" placement="top" arrow>
                                <StyledIconButton>
                                    <DeleteOutlineOutlinedIcon fontSize="small" color="primary" />
                                </StyledIconButton>
                            </Tooltip>
                            <Tooltip title="Пометить непрочитанными" placement="top" arrow>
                                <StyledIconButton>
                                    <MarkChatUnreadIcon fontSize="small" color="primary" />
                                </StyledIconButton>
                            </Tooltip>
                        </StyledListInline>
                    </Box>
                    {/* Всплывающий блок с чатом */}
                    <StyledMessageDetails
                        sx={
                            !show
                                ? { visibility: 'hidden', opacity: 0, transform: 'translateX(100%)' }
                                : { visibility: 'visible', opacity: 1, transform: 'translateX(0)' }
                        }
                    >
                        dfgfdg
                    </StyledMessageDetails>
                </StyledListItem>
            </List>
        </Paper>
    );
};

export default MessangerList;
