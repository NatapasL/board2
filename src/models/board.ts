export interface Board {
  type: string;
  id: number;
  description: string;
  settings: {
    name: string;
    use_ident: boolean;
    max_posts: number;
    post_delay: number;
    expire_duration: number;
  };
  slug: string;
  status: string;
  title: string;
  path: string;
}
