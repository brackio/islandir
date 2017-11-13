import { ErrorHandler, NgModule, Optional, SkipSelf, Type } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { PagingService } from './paging.service';

import { BusinessService } from '../businesses/shared/business.service';
import { CategoryService } from '../models/categories/category.service';
import { CountryService } from '../models/countries/country.service';
import { KeywordService } from '../models/keywords/keyword.service';
import { ServiceService } from '../models/services/service.service';

import { CommonService } from './common.service';
import { AlertService } from './alert.service';
import { JWTInterceptor } from './jwt-interceptor.service';
import { GlobalErrorHandler } from './global-error-handler';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CacheManagerService } from './cache-manager.service';

import { ErrorLogService } from './error-log.service';
import { LogglyLoggerService } from './loggly-logger.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    PagingService,
    BusinessService,
    CategoryService,
    CountryService,
    CommonService,
    AlertService,
    CanDeactivateGuard,
    CacheManagerService,
    GlobalErrorHandler,
    ErrorLogService,
    // LogglyLoggerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
