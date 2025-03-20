import { AppBar, Box, BoxProps, styled, Tab, TabProps, Tabs } from '@mui/material';
import classNames from 'classnames';
import { ReactNode, SyntheticEvent, useState } from 'react';
import styles from './TabPanels.module.css';

export type TabPanelProps = {
    indicatorColor?: 'primary' | 'secondary';
    tabs: {
        label: string;
        children: ReactNode;
    }[];
} & TabProps;

type PanelProps = {
    children?: ReactNode;
    dir?: string;
    index: number;
    value: number;
} & BoxProps;

interface StyledTabProps {
    label: string;
}

const Panel = (props: PanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            className={classNames(value == index ? styles.show : '', styles.fade)}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
};

const TabPanels = (props: TabPanelProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };

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

    const AntTabs = styled(Tabs)({
        '& .MuiTabs-indicator': {
            backgroundColor: props.indicatorColor,
        },
    });
    const a11yProps = (index: number) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    return (
        <Box sx={{ width: '100%', borderRadius: '5px' }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: 'background.paper', backgroundImage: 'none', borderRadius: '5px' }}
            >
                <AntTabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
                        width: '100%',
                        '@media (max-width: 579.98px)': { '.MuiTabs-flexContainer': { flexDirection: 'column' } },
                        backgroundColor: 'background.paper',
                        borderRadius: '5px',
                    }}
                >
                    {props.tabs.map((tab, index) => (
                        <AntTab key={index} label={tab.label} {...a11yProps(index)} />
                    ))}
                </AntTabs>
            </AppBar>
            <Box sx={{ mt: 2 }} className={styles.tabContent}>
                {props.tabs.map((tab, index) => (
                    <Panel key={index} value={value} index={index}>
                        {tab.children}
                    </Panel>
                ))}
            </Box>
        </Box>
    );
};

export default TabPanels;
