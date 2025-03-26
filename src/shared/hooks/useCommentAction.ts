import { useAddCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '../../entities/comment/api/commentApi';
const useCommentAction = () => {
    const [addComment] = useAddCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
    
    const handleAddComment =  (postId: number, content: string, parent_id: number, files?: File[], ) => {
        const formData = new FormData();
        formData.append('content', content);
        if (files) {
            files.forEach((file) => formData.append('images', file));
        }
        if (parent_id) {
            formData.append('parent_id', parent_id.toString());
        }
        formData.append('post_id', postId.toString());

       return  addComment({ fromData: formData });
    };

    const handleUpdateComment = async (commentId: number, content?: string, files?: File[], parent_id?: number) => {
        const formData = new FormData();
        if (content) {
            formData.append('content', content);
        }
        if (files) {
            files.forEach((file) => formData.append('new_images', file));
        }
        if (parent_id) {
            formData.append('parent_id', parent_id.toString());
        }
        return updateComment({ fromData: formData, commentId });
    };

    const handleDeleteComment = async (commentId: number) => {
        return deleteComment({ commentId });
    };
    
    return { handleAddComment, handleUpdateComment, handleDeleteComment };
};

export default useCommentAction;
