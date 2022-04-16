export interface Post {
  id?: string;
  title: string;
  content: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface PostsListResponse {
  data: Post[];
  total: number;
};