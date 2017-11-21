
import { CONFIG } from './config';

export interface IPaging {
  page: number;
  skip: number;
  limit: number;
}

export class Paging {
  constructor() { }

  static paginate(currentPage: number, itemsPerPage?: number): IPaging {
    if (currentPage < 0 ) { currentPage = 0; }
    const page: number = currentPage + 1;
    const perPage: number = itemsPerPage || CONFIG.paging.limit;
    const skip: number = (page - 1) * perPage;

    return {
      page: page,
      skip: skip < 0 ? 0 : skip,
      limit: perPage
    };
  }
}
