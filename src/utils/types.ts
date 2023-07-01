export type GenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
};

export type GenericUpdatableView = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
};

export type GenericNonUpdatableView = {
  Row: Record<string, unknown>;
};

export type GenericView = GenericUpdatableView | GenericNonUpdatableView;

export type GenericFunction = {
  Args: Record<string, unknown>;
  Returns: unknown;
};

export type GenericSchema = {
  Tables: Record<string, GenericTable>;
  Views: Record<string, GenericView>;
  Functions: Record<string, GenericFunction>;
  headers: any;
};

export interface AppProps {
  appID: string;
}

export interface LoginProps {
  isAuthorized: boolean;
  userID: string;
}

export interface LinkProps {
  href: string;
  text: string;
  className: string;
  children?: React.ReactNode;
}

export type addFormData = {
  link: string;
  title: string;
};

export interface addFormProps {
  submitCallback: (data: addFormData) => void;
  loading: boolean;
}

export interface DashboardProps {
  isAuthorized: boolean;
  username: string;
  appID: string;
  userId: string;
}

export interface LinkData {
  created_at: string;
  id: number;
  long_url: string;
  short_url: string;
  title: string;
  user_id: string;
}

export type Option = {
  value: string;
  label: string;
};

export interface HeaderProps {
  username: string;
  signOut: () => void;
}
