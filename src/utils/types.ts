export type ResponseData = {
  status: number;
  data?: any;
};
export type SortParams = {
  sort_by?: string;
  sort_type?: string;
};
export type PaginationParams = {
  p?: string;
  limit?: string;
};
export type QueryParams = SortParams & PaginationParams;
export type ParsedQueryParams = {
  sort_by?: string;
  sort_type?: string;
  p?: number;
  limit?: number;
  select?: string;
};
