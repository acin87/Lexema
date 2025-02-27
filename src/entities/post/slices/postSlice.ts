import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypes } from '../types/PostTypes';

interface PostState {
    posts: PostTypes[];
    skipPost: number;
    scrollPosition: number;
}
const initialState: PostState = {
    posts: [],
    skipPost: 0,
    scrollPosition: 0,
};

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostTypes[]>) => {
            action.payload.forEach((post) => {
                state.posts.push(post);
            });
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        },
        setSkipPost: (state, action: PayloadAction<number>) => {
            state.skipPost = action.payload;
        },
        setScrollPosition: (state, action: PayloadAction<number>) => {
            state.scrollPosition = action.payload;
        },
    },
});

export const { setPosts, removePost, setSkipPost, setScrollPosition } = postSlice.actions;
export default postSlice.reducer;
