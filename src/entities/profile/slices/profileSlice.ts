import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostTypes } from '../../post/types/PostTypes';
import { Profile } from '../types/ProfileTypes';

interface ProfileState {
    profile: Profile | null;
    scrollPosition: number;
    posts: PostTypes[];
    skipPost: number;
}

const initialState: ProfileState = {
    profile: null,
    scrollPosition: 0,
    posts: [],
    skipPost: 0,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostTypes[]>) => {
            state.posts = action.payload;
        },
        addPosts: (state, action: PayloadAction<PostTypes[]>) => {
            //на всякий случай добавляем только новые посты
            const newPosts = action.payload.filter((post) => !state.posts.some((p) => p.id === post.id));
            state.posts.push(...newPosts)
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id);
        },
        setSkipPost: (state, action: PayloadAction<number>) => {
            state.skipPost = action.payload;
        },
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        },
        setScrollPosition: (state, action: PayloadAction<number>) => {
            state.scrollPosition = action.payload;
        },
    },
});

export const { setProfile, setScrollPosition, setPosts, addPosts, removePost, setSkipPost } = profileSlice.actions;
export default profileSlice.reducer;
