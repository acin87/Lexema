import { User } from "../user/usersTypes";

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
    views: number,
    className: string
  }
  
  export type Reaction = {
    likes: number;
    dislikes: number;
  }
  export type TagsTypes = {

  }
  export type CommentResponse = {
    comments: CommentType[],
    total?: number;
    skip?: number;
    limit?: number;
  }
  export type CommentType ={
    id: number,
    body: string,
    likes: number,
    user: User,
  }
  