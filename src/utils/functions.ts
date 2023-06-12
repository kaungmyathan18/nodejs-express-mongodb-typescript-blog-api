import { DEFAULT_PAGINATION_DATA } from '@config/constants';
import { IPagination } from '@interfaces/pagination.interface';

export function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0;
}

export function getParsedPaginationData(payload: any): IPagination {
  if (isEmptyObject(payload)) {
    return DEFAULT_PAGINATION_DATA;
  }
  return {
    page: parseInt(payload?.page) || DEFAULT_PAGINATION_DATA.page,
    rowsPerPage:
      parseInt(payload?.rowsPerPage) || DEFAULT_PAGINATION_DATA.rowsPerPage,
  };
}
