import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { CommentType } from '../types/commntsType';

interface CommentState {
    expandedComments: Record<string, boolean>;
    commentsMap: Record<string, CommentType[]>;
}

const initialState: CommentState = {
    expandedComments: {},
    commentsMap: {},
};

const commentSlice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {
        setExpanded: (state, action: PayloadAction<{ commentId: string; expanded: boolean }>) => {
            const { commentId, expanded } = action.payload;
            state.expandedComments[commentId] = expanded;
        },
        updateComments: (state, action: PayloadAction<{ parentId: string; comments: CommentType[] }>) => {
            const { parentId, comments } = action.payload;
            state.commentsMap[parentId] = comments;
        },
        addComment: (state, action: PayloadAction<{ parentId: string; comment: CommentType }>) => {
            const { parentId, comment } = action.payload;
            if (!state.commentsMap[parentId]) {
                state.commentsMap[parentId] = [];
            }
            state.commentsMap[parentId].push(comment);
        },
        removeComment: (state, action: PayloadAction<{ parentId: string; commentId: number }>) => {
            const { parentId, commentId } = action.payload;
            if (state.commentsMap[parentId]) {
                state.commentsMap[parentId] = state.commentsMap[parentId].filter((comment) => comment.id !== commentId);
            }
        },
    },
});

export const { setExpanded, updateComments, addComment, removeComment } = commentSlice.actions;

export const getExpanded = (state: RootState) => state.comments.expandedComments;
export const getExpandedById = (state: RootState, commentId: string) => state.comments.expandedComments[commentId];
export const getCommentsByParentId = (state: RootState, parentId: string) => state.comments.commentsMap[parentId];

export default commentSlice.reducer;
