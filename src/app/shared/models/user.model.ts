export interface User {
  id: string;
  collection_id: string;
  project_id: number;
  app_user_id: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  data: {
    email: string;
    last_name: string;
    first_name: string;
  };
}

export interface TableUsersList {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface GetUsersParams {
  page: number;
  limit: number;
}

export interface GetUsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
