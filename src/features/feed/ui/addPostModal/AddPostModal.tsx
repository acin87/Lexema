import { SnackbarCloseReason } from '@mui/material';
import { FC, Fragment, memo, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../../../../entities/post/types/PostTypes';
import { selectUser } from '../../../../entities/user/slice/userSlice';
import UploadModal from '../../../../shared/ui/uploadModal/uploadModal';
import { usePostButtonAction } from '../../hooks/usePostButtonAction';

/**
 * Пропсы для компонента AddPostModal
 * @param {string} title - Заголовок модального окна
 * @param {function} onClose - Функция закрытия модального окна
 * @param {boolean} open - Флаг открытия модального окна
 * @param {boolean} editMode - Флаг редактирования поста
 * @param {PostTypes} post - Пост
 */
interface ModalProps {
    title?: string;
    onClose: () => void;
    open: boolean;
    editMode?: boolean;
    post?: Post;
    context: 'profile' | 'group';
    group_id?: number;
}

/**
 * Компонент для отображения модального окна добавления поста
 * @param {ModalProps} props - Пропсы для компонента AddPostModal
 * @returns {JSX.Element} - Элемент JSX
 */
const AddPostModal: FC<ModalProps> = ({ onClose, open, title, post, context, group_id, editMode }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [postText, setPostText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const user_id = useSelector(selectUser).id;

    const { handleCreatePost, handleUpdatePost } = usePostButtonAction({
        context,
        group_id,
    });

    useEffect(() => {
        if (editMode && post) {
            setPostText(post.content);
        }
    }, [editMode, post]);

    const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleFilesChange = (files: File[]) => {
        setFiles(files);
    };

    const handleUploadPost = async () => {
        if (postText === '' && !files.length) {
            console.error('Ошибка загрузки файлов:', 'Пост не может быть пустым');
            return;
        }
        try {
            if (editMode && post) {
                await handleUpdatePost(post.id, postText, files, user_id);
            } else {
                await handleCreatePost(user_id, postText, files);
            }
            onClose();
        } catch (e) {
            console.error('Ошибка загрузки поста:', e);
            setOpenSnackbar(true);
        }
    };

    return (
        <Fragment>
            <UploadModal
                open={open}
                onClose={onClose}
                title={title}
                postText={postText}
                setPostText={setPostText}
                handleFilesChange={handleFilesChange}
                handleUploadPost={handleUploadPost}
                openSnackbar={openSnackbar}
                handleCloseSnackbar={handleCloseSnackbar}
                files={files}
            />
        </Fragment>
    );
};

export default memo(AddPostModal);
