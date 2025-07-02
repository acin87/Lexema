import { Air, Opacity, WbSunny, Whatshot } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Divider, Skeleton, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import { useGetWeatherQuery } from './weatherApi';

const WeatherWidget: FC = () => {
    const WEATHER_API_KEY = '7a57f3da37934398874170418252406';
    const CITY = 'UFA';

    const theme = useTheme();
    const { data: weatherData, isLoading } = useGetWeatherQuery({ key: WEATHER_API_KEY, city: CITY });

    const kphToMps = (kph: number): number => Math.round((kph / 3.6) * 10) / 10;

    const renderSkeletonText = (width: number) => (
        <Skeleton variant="text" width={width} height={24} sx={{ bgcolor: theme.palette.action.disabledBackground }} />
    );

    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
            }}
        >
            <CardHeader 
                title="Погода"
            />
            <Divider />
            <CardContent>
                {isLoading ? (
                    renderSkeletonText(120)
                ) : (
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {weatherData?.location.region || 'Неизвестный регион'}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {isLoading ? (
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            sx={{ bgcolor: theme.palette.action.disabledBackground }}
                        />
                    ) : (
                        <WbSunny sx={{ fontSize: 40, color: theme.palette.warning.main }} />
                    )}

                    {isLoading ? (
                        renderSkeletonText(60)
                    ) : (
                        <Typography variant="h4" sx={{ ml: 1 }}>
                            {Math.round(weatherData?.current.temp_c || 0)}°C
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {isLoading ? (
                        <Skeleton
                            variant="circular"
                            width={20}
                            height={20}
                            sx={{ mr: 1, bgcolor: theme.palette.action.disabledBackground }}
                        />
                    ) : (
                        <Whatshot sx={{ fontSize: 20, color: theme.palette.error.main, mr: 1 }} />
                    )}

                    {isLoading ? (
                        renderSkeletonText(160)
                    ) : (
                        <Typography variant="body2">
                            Ощущается как: {Math.round(weatherData?.current.feelslike_c || 0)}°C
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {isLoading ? (
                        <Skeleton
                            variant="circular"
                            width={20}
                            height={20}
                            sx={{ mr: 1, bgcolor: theme.palette.action.disabledBackground }}
                        />
                    ) : (
                        <Air sx={{ fontSize: 20, color: theme.palette.info.main, mr: 1 }} />
                    )}

                    {isLoading ? (
                        renderSkeletonText(200)
                    ) : (
                        <Typography variant="body2">
                            Ветер: {kphToMps(weatherData?.current.wind_kph || 0)} м/с (порывы до{' '}
                            {kphToMps(weatherData?.current.gust_kph || 0)} м/с)
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isLoading ? (
                        <Skeleton
                            variant="circular"
                            width={20}
                            height={20}
                            sx={{ mr: 1, bgcolor: theme.palette.action.disabledBackground }}
                        />
                    ) : (
                        <Opacity sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1 }} />
                    )}

                    {isLoading ? (
                        renderSkeletonText(120)
                    ) : (
                        <Typography variant="body2">Влажность: {weatherData?.current.humidity || 0}%</Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default WeatherWidget;
