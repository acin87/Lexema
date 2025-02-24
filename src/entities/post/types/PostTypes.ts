export type PostResponse = { posts: PostTypes[] };

export type PostTypes = {
    id: number;
    title: string;
    body: string;
    tags: Tag[];
    reactions: Reaction;
    userId: number;
    views: number;
    className: string;
};

type Reaction = {
    likes: number;
    dislikes: number;
};
type Tag = {
    name: string;
};
export type FileUploadResponse = {
    fileUrls: string[];
};
