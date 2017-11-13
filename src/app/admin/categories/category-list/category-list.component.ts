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

import { Category } from '../../../models/categories/category';
import { CategoryService } from '../../../models/categories/category.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  public dataSource: CategoryDataSource | null;
  public displayedColumns = ['name', 'icon', 'color'];
  public pageIndex = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new CategoryDataSource(this.categoryService, this.sort, this.paginator);
  }

  public onCategorySelected(row: Category): void {
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  public onPageChange(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
  }
}

export class CategoryDataSource extends DataSource<Category> {
  public totalItems = 0;
  private displayedColumns = ['name', 'icon', 'color'];

  constructor(
    private categoryService: CategoryService,
    private sort: MatSort,
    private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Category[]>  {
    const displayDataChanges = [
      this.sort.sortChange,
      this.paginator.page
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        //this.isLoadingResults = true;
        return this.categoryService.get(
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
