/**
 * Created by TBaker on 3/20/2017.
 */
import { Injectable } from '@angular/core';
import { CONFIG } from './config';

export interface IPaging {
  page: number;
  skip: number;
  limit: number;
}

@Injectable()
export class PagingService {
  constructor() { }

  public paginate(currentPage: number, itemsPerPage?: number): IPaging {
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
