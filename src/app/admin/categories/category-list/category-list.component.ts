import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

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

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        return this.categoryService.get(
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
