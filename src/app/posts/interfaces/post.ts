import { User } from 'src/app/auth/interfaces/user';

export interface Post {
  id?: string;
  title: string;
  content: string;
  image?: File;
  imagePath: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostsListResponse {
  data: Post[];
  total: number;
}
