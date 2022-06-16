export interface Post {
  id?: string;
  title: string;
  content: string;
  image?: File;
  imagePath: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostsListResponse {
  data: Post[];
  total: number;
}
