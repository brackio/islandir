import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
  Router,
  ActivatedRoute,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';

import { Topic } from '../../../models/topics/topic';
import { TopicService } from '../../../models/topics/topic.service';

@Injectable()
export class TopicResolverService implements Resolve<Topic> {
  constructor(
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Topic> | Topic {
    const id = route.paramMap.get('id');
    if ( id === 'new') {
      return new Topic();
    }

    return this.topicService.findOne(id)
      .pipe(
        map(topic => {
          if (topic) {
            return topic;
          } else { // id not found
            this.router.navigate(['../'], { relativeTo: this.route });
            return null;
          }
        })
      );
  }
}
