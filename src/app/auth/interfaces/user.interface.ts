export interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}
