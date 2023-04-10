import { User } from 'src/app/auth/interfaces/user.interface';

export interface Post {
  id?: string;
  title: string;
  content: string;
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
