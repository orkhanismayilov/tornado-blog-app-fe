export interface SnackbarData {
  isError: boolean;
  message: string;
  duration?: number;
  [key: string]: any;
};
