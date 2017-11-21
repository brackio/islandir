import { ErrorHandler, NgModule, Optional, SkipSelf, Type } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { CountryService } from '../models/countries/country.service';
import { CommonService } from './common.service';
import { AlertService } from './alert.service';
import { JWTInterceptor } from './jwt-interceptor.service';
import { GlobalErrorHandler } from './global-error-handler';
import { CacheManagerService } from './cache-manager.service';

import { ErrorLogService } from './error-log.service';
import { LogglyLoggerService } from './loggly-logger.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CountryService,
    CommonService,
    AlertService,
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
