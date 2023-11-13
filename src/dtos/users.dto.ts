export interface user_login {
  email: string;
  password: string;
}

export interface user_input {
  username: string;
  email: string;
  password: string;
  image: string | undefined;
}
export interface user_output {
  id: number;
  username: string;
  email: string;
  image: string | undefined;
  created_at: Date;
}

export interface user_token {
  id: number;
  email: string;
}

export interface user {
  id: number;
  username: string;
  email: string;
  password: string;
  image: string | undefined;
  created_at: Date;
}
