import { createSelector } from '@reduxjs/toolkit';
import { RootState, store } from '../../../app/store/store';
import { CommentType } from '../types/commntsType';

const selectCommentsState = (state: RootState) => state.comments;

const selectCommentsMap = createSelector([selectCommentsState], (commentsState) => commentsState.commentsMap);

const selectCommentsById = createSelector(
    [selectCommentsMap, (_state: RootState, id: string) => id],
    (commentsMap, id: string) => {
        // Ищем комментарий во всех ветках
        for (const comments of Object.values(commentsMap)) {
            const comment = comments.find((comment: CommentType) => comment.id === Number(id));
            if (comment) return comment;
        }
        return undefined;
    },
);

export const getParentId = (id: string) => {
    const comment = selectCommentsById(store.getState(), id);
    if(comment?.parent_id && comment?.parent_id != null) 
        return comment?.parent_id.toString() as FormDataEntryValue;
    return null;
};
