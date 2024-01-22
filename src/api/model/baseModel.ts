export interface BasicPageParams {
  currentPage: number | null;
  pageSize: number | null;
}

export interface BasicFetchResult<T> {
  traceId: string;
  totalPages: number;
  currentPage: number;
  results: {
    total: number;
    currentPage: number;
    pageSize: number;
    items: T[];
  };
  status: number;
  msg: string;
  // total: number;
  requestedTime: string;
  responsedTime: string;
}

export interface BasicResult<T> {
  total: number;
  currentPage: number;
  pageSize: number;
  items: T[];
}
