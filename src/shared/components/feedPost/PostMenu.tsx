import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';

/**
 * Пропсы для компонента PostMenu
 * @param {boolean} isAuthorized - Флаг авторизации
 * @param {function} onEdit - Функция редактирования поста
 * @param {function} onDelete - Функция удаления поста
 */
interface PostMenuProps {
    isAuthorized: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

/**
 * Компонент для отображения меню поста
 * @param {PostMenuProps} props - Пропсы для компонента PostMenu
 * @returns {JSX.Element} - Элемент JSX
 */
const PostMenu: FC<PostMenuProps> = ({ isAuthorized, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isAuthorized && (
                <>
                    <IconButton aria-label="post settings" onClick={handleOpenMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={onEdit}>Редактировать</MenuItem>
                        <MenuItem onClick={onDelete}>Удалить</MenuItem>
                    </Menu>
                </>
            )}
        </>
    );
};

export default PostMenu;
