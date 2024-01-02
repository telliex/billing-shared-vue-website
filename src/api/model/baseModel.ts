export interface BasicPageParams {
  page: number | null;
  pageSize: number | null;
}

export interface BasicFetchResult<T> {
  traceId: string;
  totalPages: number;
  currentPage: number;
  results: T[];
  status: number;
  msg: string;
  total: number;
  requestedTime: string;
  responsedTime: string;
}
