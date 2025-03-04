import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const CustomScrollbar: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startTop, setStartTop] = useState(0);

    // Обновление положения и размера ползунка
    const updateScrollbarThumb = () => {
        if (contentRef.current && listRef.current && scrollbarThumbRef.current) {
            const contentHeight = contentRef.current.clientHeight;
            const listHeight = listRef.current.scrollHeight;
            const thumbHeight = (contentHeight / listHeight) * contentHeight;

            scrollbarThumbRef.current.style.height = `${thumbHeight}px`;

            const maxScrollTop = listHeight - contentHeight;
            const scrollPercent = contentRef.current.scrollTop / maxScrollTop;
            const thumbPosition = scrollPercent * (contentHeight - thumbHeight);

            scrollbarThumbRef.current.style.top = `${thumbPosition}px`;
        }
    };

    // Обработка прокрутки контента
    const handleScroll = () => {
        updateScrollbarThumb();
    };

    // Обработка начала перетаскивания ползунка
    const handleThumbMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartY(e.clientY);
        if (scrollbarThumbRef.current) {
            setStartTop(parseFloat(scrollbarThumbRef.current.style.top) || 0);
        }

        const onMouseMove = (e: MouseEvent) => {
            if (isDragging && contentRef.current && scrollbarThumbRef.current) {
                const deltaY = e.clientY - startY;
                const newTop = startTop + deltaY;

                const maxTop = contentRef.current.clientHeight - scrollbarThumbRef.current.clientHeight;
                const scrollTop = (newTop / maxTop) * (listRef.current!.scrollHeight - contentRef.current.clientHeight);

                contentRef.current.scrollTop = scrollTop;
                updateScrollbarThumb();
            }
        };

        const onMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    // Инициализация скроллбара
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <Box
            sx={{
                width: 300,
                height: 200,
                border: '1px solid #ccc',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    padding: '10px',
                    backgroundColor: '#f0f0f0',
                    borderBottom: '1px solid #ccc',
                }}
            >
                Заголовок
            </Box>
            <Box
                ref={contentRef}
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '10px',
                }}
            >
                <ul
                    ref={listRef}
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '1rem',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        >
                            Элемент списка {index + 1}
                        </li>
                    ))}
                </ul>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '12px',
                        height: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '6px',
                    }}
                >
                    <Box
                        ref={scrollbarThumbRef}
                        onMouseDown={handleThumbMouseDown}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            backgroundColor: '#888',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default CustomScrollbar;
