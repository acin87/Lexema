import { Box, SxProps } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const useCustomScrollBar = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const scrollbarThumbRef = useRef<HTMLDivElement>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [startY, setStartY] = useState(0);
    const [startTop, setStartTop] = useState(0);

    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

    // Обновление положения и размера ползунка
    const updateScrollbarThumb = useCallback(() => {
        if (contentRef.current && listRef.current && scrollbarThumbRef.current) {
            const computedStyle = window.getComputedStyle(contentRef.current);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            const contentHeight = contentRef.current.clientHeight - paddingTop - paddingBottom;

            const listHeight = listRef.current.scrollHeight;

            const thumbHeight = Math.max(20, (contentHeight / listHeight) * contentHeight);
            scrollbarThumbRef.current.style.height = `${thumbHeight}px`;

            const maxScrollTop = listHeight - contentHeight;

            // Ограничиваем scrollTop (на случай инерции или резкого скролла)
            const scrollTop = Math.min(
                Math.max(0, contentRef.current.scrollTop), // Не меньше 0
                maxScrollTop, // Не больше максимума
            );

            // Позиция ползунка (0% - 100%)
            const scrollPercent = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

            // Ограничиваем позицию, чтобы не выходила за границы
            const thumbPosition = Math.min(scrollPercent * (contentHeight - thumbHeight), contentHeight - thumbHeight);

            scrollbarThumbRef.current.style.transform = `translateY(${thumbPosition}px)`;
        }
    }, []);

    const handleScroll = useCallback(() => {
        updateScrollbarThumb();
    }, [updateScrollbarThumb]);

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

    const activateScrollbar = () => {
        setIsScrollbarVisible(true);
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsScrollbarVisible(false);
        }, 1000);
    };

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

    useEffect(() => {
        const content = contentRef.current;

        if (!content) return;
        const handleScroll = () => activateScrollbar();
        const handleMouseMove = () => activateScrollbar();
        const handleTouchMove = () => activateScrollbar();
        content.addEventListener('scroll', handleScroll);
        content.addEventListener('mousemove', handleMouseMove);
        content.addEventListener('touchmove', handleTouchMove);

        return () => {
            content.removeEventListener('scroll', handleScroll);
            content.removeEventListener('mousemove', handleMouseMove);
            content.removeEventListener('touchmove', handleTouchMove);
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    const scrollbarStyle: SxProps = {
        position: 'absolute',
        minHeight: '10px',
        cursor: 'pointer',
        top: '2px',
        bottom: '2px',
        left: '2px',
        right: '2px',
        borderRadius: '7px',
        backgroundColor: 'divider',
        opacity: isScrollbarVisible ? 0.8 : 0,
        transition: 'opacity 0.3s ease',
    };

    const scrollBar = (
        <Box
            className="scrollbar"
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
                sx={{ ...scrollbarStyle }}
            />
        </Box>
    );

    return { contentRef, listRef, scrollBar };
};

export default useCustomScrollBar;
