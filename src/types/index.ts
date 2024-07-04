export interface Post {
  posts: PostElement[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostElement {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}
