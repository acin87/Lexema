import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../../../app/store/store';
import { CommentType } from '../types/commntsType';

const selectAllComments = (state: RootState) => state.comments;

const selectCommentsById = createSelector(
    [selectAllComments, (_state: RootState, id: string) => id],
    (comments: CommentType[], id: string) => {
        return comments.find((comment: CommentType) => comment.id === Number(id));
    },
);

export const getParentId = (id: string) => {
    const parentId = selectCommentsById(store.getState(), id);
    return parentId?.parent_id;
};
