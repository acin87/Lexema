export type PostResponse = { results: PostTypes[]; count: number; next: string; previous: string };

export type PostRequest = {
    limit: number;
    offset: number;
    author: number | null;
};

export type PostTypes = {
    id: number;
    title: string;
    content: string;
    images: [{ image: string }] | null;
    video_urls: string[] | null;
    likes_count: number;
    dislikes_count: number;
    created_at: string;
    group: number | null;
    author: number;
    views_count: number;
};

export type FileUploadResponse = {
    fileUrls: string[];
};
