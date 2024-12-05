import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Collapse } from '@mui/material';
import { ComponentPropsWithoutRef, FC, memo, ReactNode, useState } from 'react';

type Props = {
    children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const ExpandCollapseButton: FC<Props> = memo(({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                size="small"
                sx={{
                    width: '35px',
                    justifyContent: 'center',
                    marginLeft: 1,
                }}
                variant="text"
    
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ExpandLess  /> : <ExpandMore />}
            </Button>

            <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{width: '100%'}}>
                {children}
            </Collapse>
        </Box>
    );
});
