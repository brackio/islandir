import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { Business } from '../../../businesses/shared/business';
import { BusinessService } from '../../../businesses/shared/business.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-admin-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  public dataSource: BusinessDataSource | null;
  public displayedColumns = ['name', 'address.street', 'address.city', 'phone'];
  public pageIndex = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new BusinessDataSource(this.businessService, this.sort, this.paginator);
  }

  public onBusinessSelected(row: Business): void {
    // this.router.navigate([row.slug], { relativeTo: this.route });
    this.router.navigate([`business/${row.slug}/edit`]);
  }

  public onPageChange(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
  }

}

export class BusinessDataSource extends DataSource<Business> {
  public totalItems = 0;
  private displayedColumns = ['name', 'address.street', 'address.city', 'phone', 'slug'];

  constructor(
    private businessService: BusinessService,
    private sort: MatSort,
    private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Business[]>  {
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        return this.businessService.get(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.displayedColumns);
      }),
      catchError(() => {
        return of(null);
      }),
      map(result => {
        return result;
      }),
      map(result => {
        if (!result) { return []; }
        this.totalItems = +result.headers.get(CONFIG.vars.xInlineCount);
        return result.body;
      })
    );
  }

  disconnect() {}
}

