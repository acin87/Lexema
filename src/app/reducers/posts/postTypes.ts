export type PostResponse = {
    posts: PostTypes[];
    total?: number;
    skip?: number;
    limit?: number;
  }
  
  export type PostTypes  = {
    id: number;
    title: string;
    body: string,
    tags: string[]
    reactions: Reaction;
    userId: number;
    views: number
  }
  
  export type Reaction = {
    likes: number;
    dislikes: number;
  }
  export type TagsTypes = {

  }
  