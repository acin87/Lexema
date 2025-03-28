export type PostResponse = { results: PostTypes[]; count: number; next: string; previous: string };

export type PostRequest = {
    limit: number;
    offset: number;
};

export type PostTypes = {
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
