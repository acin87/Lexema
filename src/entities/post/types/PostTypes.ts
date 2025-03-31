export type PostResponse = { results: Post[]; count: number; next: string; previous: string };

export type PostRequest = {
    profileOrGroupOwnerId?: number;
    limit: number;
    offset: number;
};

export type Post = {
    id: number;
    original_post: number | null;
    title: string;
    content: string;
    images?: [{ image: string }];
    video_urls?: string[];
    is_liked: boolean;
    likes_count: number;
    dislikes_count: number;
    user_reaction: string | null;
    created_at: string;
    group?: number;
    author: PostAuthor;
    views: number;
    comments_count: number;
    reposts_count: number;
    signature: string;
};

export type FileUploadResponse = {
    fileUrls: string[];
};

export type PostAuthor = {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
};
