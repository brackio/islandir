import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

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

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        //this.isLoadingResults = true;
        return this.countryService.get(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.displayedColumns);
      })
      .catch(() => {
        return Observable.of(null);
      })
      .map(result => {
        //this.isLoadingResults = false;
        return result;
      })
      .map(result => {
        if (!result) { return []; }
        this.totalItems = +result.headers.get(CONFIG.vars.xInlineCount);
        return result.body;
      });
  }

  disconnect() {}
}
