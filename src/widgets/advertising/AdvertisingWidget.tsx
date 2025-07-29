import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { FC } from 'react';

const AdvertisingWidget: FC = () => {
    return (
        <Card sx={{maxHeight:'400px'}}>
            <CardHeader title="Рекламный виджет" />
            <Divider />
            <CardContent>
                <img width='100%' height={300} src="/public/banner_200_300.png" alt="Реклама" />
            </CardContent>
        </Card>
    );
};

export default AdvertisingWidget;
