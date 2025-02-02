import { AppBar, Box, BoxProps, styled, Tab, Tabs, Typography, useTheme } from '@mui/material';
import cn from 'classnames';
import { memo, SyntheticEvent, useState } from 'react';
import styles from './Profile.module.css';
type TabPanelProps = {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
} & BoxProps;
interface StyledTabProps {
    label: string;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};
const AntTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        backgroundColor: 'primary.main',
    },
});
const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'text.primary',
    '&:hover': {
        color: '#40a9ff',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: 'text.primary',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: 'primary.main',
        borderRadius: '5px',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
}));

const ProfileBody = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', borderRadius: '5px' }}>
            <AppBar position="static" sx={{ backgroundColor: 'background.paper', backgroundImage: 'none', borderRadius: '5px' }}>
                <AntTabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
                        width: '100%',
                        '@media (max-width: 991.98px)': { '.MuiTabs-flexContainer': { flexDirection: 'column' } },
                        backgroundColor: 'background.paper',
                        borderRadius: '5px',
                    }}
                >
                    <AntTab label="Стена" {...a11yProps(0)} />
                    <AntTab label="Настройки" {...a11yProps(1)} />
                    <AntTab label="Друзья" {...a11yProps(2)} />
                    <AntTab label="Галерея" {...a11yProps(3)} />
                </AntTabs>
            </AppBar>
            <Box sx={{ mt: 2 }} className={styles.tabContent}>
                <TabPanel value={value} index={0} dir={theme.direction} className={cn(value == 0 ? [styles.show, styles.active] : '', styles.fade, styles.tabPanel)} sx={{bgcolor: 'background.paper'}}>
                    Стена - {value}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} className={cn(value == 1 ? [styles.show, styles.active]  : '', styles.fade, styles.tabPanel)} sx={{bgcolor: 'background.paper'}}>
                    222 - {value}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} className={cn(value == 2 ? [styles.show, styles.active]  : '', styles.fade, styles.tabPanel)} sx={{bgcolor: 'background.paper'}}>
                    Item Three - {value}
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction} className={cn(value == 3 ? [styles.show, styles.active]  : '', styles.fade, styles.tabPanel)} sx={{bgcolor: 'background.paper'}}>
                    Item four - {value}
                </TabPanel>
            </Box>
        </Box>
    );
};
export default memo(ProfileBody);
