import { IPagination } from '@interfaces/pagination.interface';

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DEFAULT_PAGINATION_DATA: IPagination = {
  page: 1,
  rowsPerPage: 10,
  searchKeywords: '',
};
