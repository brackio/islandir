import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, map, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { Topic } from '../../../models/topics/topic';
import { TopicService } from '../../../models/topics/topic.service';
import { CONFIG } from '../../../core/config';

@Component({
  selector: 'ilr-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  public dataSource: TopicDataSource | null;
  public displayedColumns = ['image', 'name', 'tags'];
  public pageIndex = 0;
  public pageSize: number = CONFIG.paging.limit;
  public pageLimitOptions = CONFIG.paging.limitOptions;

  constructor(
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new TopicDataSource(this.topicService, this.sort, this.paginator);
  }

  public onTopicSelected(row: Topic): void {
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  public onPageChange(event: PageEvent): void {
    this.paginator.pageIndex = event.pageIndex;
  }
}

export class TopicDataSource extends DataSource<Topic> {
  public totalItems = 0;
  private displayedColumns = ['image', 'name', 'tags'];

  constructor(
    private topicService: TopicService,
    private sort: MatSort,
    private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<Topic[]>  {
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
        return this.topicService.get(
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
