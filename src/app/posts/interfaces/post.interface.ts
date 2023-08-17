import { User } from '@tba/auth';

export interface Post {
  id?: string;
  title: string;
  content: string;
  slug?: string;
  image?: File;
  imagePath: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  relatedPosts: Post[];
}

export interface PostsListResponse {
  data: Post[];
  total: number;
}
