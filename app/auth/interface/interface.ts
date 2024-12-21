export interface ILogin {
  email: string;
  password: string;
}

export interface UseGetUserResult {
  data: any | null;
  loading: boolean;
  error: string | null;
  getUser: (email: string, password: string) => void;
}
