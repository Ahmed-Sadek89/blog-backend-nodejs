export interface posts {
  title: string,
  description: string,
  post_image: string | undefined,
  category_id?: number,
  user_id?: number,
  published_at?: string,
  last_modified_at?: string,
  category?: {
    cat_id: number,
    cat_name: string,
  }
  user?: {
    username: string,
    email: string,
    image: string
  }
}
