import { Box } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const useCustomScrollBar = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);
    const [startY, setStartY] = useState(0);
    const [startTop, setStartTop] = useState(0);

    // Обновление положения и размера ползунка
    const updateScrollbarThumb = useCallback(() => {
        if (contentRef.current && listRef.current && scrollbarThumbRef.current) {
            const contentHeight = contentRef.current.clientHeight;

            const listHeight = listRef.current.scrollHeight;

            const thumbHeight = (contentHeight / listHeight) * contentHeight;

            scrollbarThumbRef.current.style.height = `${thumbHeight}px`;

            const maxScrollTop = listHeight - contentHeight;
            const scrollPercent = contentRef.current.scrollTop / maxScrollTop;
            const thumbPosition = scrollPercent * (contentHeight - thumbHeight);
            //scrollbarThumbRef.current.style.top = `${thumbPosition}px`;
            scrollbarThumbRef.current.style.transform = `translate3d(0px, ${thumbPosition}px, 0px)`;
        }
    }, []);

    // Обработка прокрутки контента
    const handleScroll = useCallback(() => {
        updateScrollbarThumb();
    }, [updateScrollbarThumb]);

    // Обработка начала перетаскивания ползунка
    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setStartY(e.clientY);
        if (scrollbarThumbRef.current) {
            setStartTop(parseFloat(scrollbarThumbRef.current.style.top) || 0);
        }

        const onMouseMove = (e: MouseEvent) => {
            if (contentRef.current && scrollbarThumbRef.current) {
                const deltaY = e.clientY - startY;
                const newTop = startTop + deltaY;

                const maxTop = contentRef.current.clientHeight - scrollbarThumbRef.current.clientHeight;
                const scrollTop = (newTop / maxTop) * (listRef.current!.scrollHeight - contentRef.current.clientHeight);
                contentRef.current.scrollTop = scrollTop;
                updateScrollbarThumb();
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    // Инициализация скроллбара
    useEffect(() => {
        const content = contentRef.current;

        if (content) {
            content.addEventListener('scroll', handleScroll);
            updateScrollbarThumb();
        }
        return () => {
            if (content) {
                content.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll, updateScrollbarThumb]);

    const scrollBar = (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '11px',
            }}
        >
            <Box
                ref={scrollbarThumbRef}
                onMouseDown={handleThumbMouseDown}
                className="scrollbar-thumb"
                sx={{
                    position: 'absolute',
                    minHeight: '10px',
                    cursor: 'pointer',

                    top: '2px',
                    bottom: '2px',
                    left: '2px',
                    right: '2px',
                    borderRadius: '7px',
                    opacity: 0,
                    transition: 'opacity .2s linear',
                    backgroundColor: '#d6d9da',
                }}
            />
        </Box>
    );

    return { contentRef, listRef, scrollBar };
};

export default useCustomScrollBar;
