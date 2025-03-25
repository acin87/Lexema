export type PostResponse = { results: PostTypes[]; count: number; next: string; previous: string };

export type PostRequest = {
    limit: number;
    offset: number;
};

export type PostTypes = {
    id: number;
    title: string;
    content: string;
    images: [{ image: string }] | null;
    video_urls: string[] | null;
    likes: number;
    dislikes: number;
    created_at: string;
    group: number | null;
    author: { id: number; first_name: string, last_name: string, avatar: string };
    views: number;
    comments_count: number;
    reposts: number;
};

export type FileUploadResponse = {
    fileUrls: string[];
};
