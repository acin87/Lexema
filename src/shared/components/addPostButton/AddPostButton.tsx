import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Paper } from '@mui/material';
import { FC, useState } from 'react';
import AddPostModal from './AddPostModal';

/**
 * Пропсы для компонента AddPostButton
 * @param string context - Контекст
 * @param number group_id - ID группы
 */
interface AddPostButtonProps {
    context: 'profile' | 'group';
    group_id?: number;
}

/**
 * Компонент для отображения кнопки добавления поста
 * @param AddPostButtonProps props - Пропсы для компонента AddPostButton
 * @returns {JSX.Element} - Элемент JSX
 */
const AddPostButton: FC<AddPostButtonProps> = ({ context, group_id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Paper sx={{ display: 'flex', width: '100%', p: 2, mb: 2, justifyContent: 'center' }}>
            <Button startIcon={<PostAddIcon />} onClick={handleOpen}>
                Создать пост
            </Button>
            <AddPostModal open={open} onClose={handleClose} title="Новый пост" editMode={false} context={context} group_id={group_id} />
        </Paper>
    );
};

export default AddPostButton;
