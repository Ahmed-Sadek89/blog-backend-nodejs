export interface post {
  id: number;
  title: string;
  description: string;
  post_image: string | undefined;
  category_id: number;
  user_id: number;
  created_at: string;
}

export interface post_input {
  title: string;
  description: string;
  post_image: string | undefined;
  category_id: number;
  user_id: number;
}

export interface post_output {
  id: number;
  title: string;
  description: string;
  post_image: string | undefined;
  category: {
    cat_id: number;
    cat_name: string;
  };
  user: {
    username: string;
    email: string;
    image: string;
  };
  published_at: string;
}
