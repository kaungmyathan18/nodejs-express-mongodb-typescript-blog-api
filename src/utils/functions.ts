import { DEFAULT_PAGINATION_DATA } from '@config/constants';
import i18n from '@config/i18n.config';
import { InvalidIdExeption } from '@exceptions/invalidId.exception';
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
    searchKeywords: payload?.searchKeywords || '',
  };
}

export function checkForInvalidIdException(error: any) {
  if (error.name === 'CastError') {
    // Handle ID cast error
    throw new InvalidIdExeption();
  }
  throw error;
}

export function translateMessage(message: string) {
  return i18n.__(message);
}
