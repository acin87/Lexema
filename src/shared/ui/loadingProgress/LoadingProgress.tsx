import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingBar = styled(LinearProgress)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 5,
    zIndex: 9999,
});

const LoadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const start = () => {
            setProgress(0);
            setShow(true);

            timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 90) {
                        return 90;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 90);
                });
            }, 200);
        };

        const complete = () => {
            setProgress(100);
            setTimeout(() => setShow(false), 300);
        };

        start();
        // Завершаем при изменении location (после загрузки новой страницы)
        const timeout = setTimeout(complete, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [location]);

    if (!show) return null;

    return <LoadingBar variant="determinate" value={progress} color="primary"  />;
};

export default LoadingProgress;
