import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { Country } from '../../../models/countries/country';
import { CountryService } from '../../../models/countries/country.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  public dataSource: CountryDataSource | null;
  public displayedColumns = ['name', 'code', 'territories', 'zip'];
  public pageIndex = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  constructor(
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new CountryDataSource(this.countryService, this.sort, this.paginator);
  }

  public onCountrySelected(row: Country): void {
    this.router.navigate([row.code], { relativeTo: this.route });
  }

  public onPageChange(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
  }
}

export class CountryDataSource extends DataSource<Country> {
  public totalItems = 0;
  private displayedColumns = ['name', 'code', 'territories', 'zip'];

  constructor(
    private countryService: CountryService,
    private sort: MatSort,
    private paginator: MatPaginator
  ) {
    super();
  }

  connect(): Observable<Country[]> {
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
        return this.countryService.get(
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
