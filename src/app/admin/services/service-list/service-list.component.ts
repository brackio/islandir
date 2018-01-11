import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { Service } from '../../../models/services/service';
import { ServiceService } from '../../../models/services/service.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})

export class ServiceListComponent implements OnInit {
  public dataSource: ServiceDataSource | null;
  public displayedColumns = ['name', 'slug', 'category'];
  public pageIndex = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new ServiceDataSource(this.serviceService, this.sort, this.paginator);
  }

  public onServiceSelected(row: Service): void {
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  public onPageChange(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
  }
}

export class ServiceDataSource extends DataSource<Service> {
  public totalItems = 0;
  private displayedColumns = ['name', 'slug', 'category'];

  constructor(
    private serviceService: ServiceService,
    private sort: MatSort,
    private paginator: MatPaginator
  ) {
    super();
  }

  connect(): Observable<Service[]> {
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        return this.serviceService.get(
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
        if (!result) { return []; }
        this.totalItems = +result.headers.get(CONFIG.vars.xInlineCount);
        return result.body;
      })
    );
  }

  disconnect() {}
}
