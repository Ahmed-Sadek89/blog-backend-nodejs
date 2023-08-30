export interface posts {
    title?: string,
    description?: string,
    post_image?: string| undefined,
    category_id?: number,
    user_id?: number,
}

export interface postsByCategory extends posts {
  cat_name: string
}

export interface postsByUser extends postsByCategory {
    user: {
        username: string,
        email: string,
        post_image: string
    }
  }

