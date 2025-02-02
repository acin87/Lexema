import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypes } from '../types/PostTypes';

interface PostState {
    posts: PostTypes[];
    skip: number;
    limit: number;
}
const initialState: PostState = {
    posts: [],
    skip: 0,
    limit: 5,
};

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostTypes[]>) => {
            state.posts = action.payload;
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        },
    },
});

export const postsActions = postSlice.actions;
export default postSlice.reducer;
