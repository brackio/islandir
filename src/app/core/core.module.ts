import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { CountryService } from '../models/countries/country.service';
import { MessageService } from './message.service';
import { JWTInterceptor } from './jwt-interceptor.service';
import { ErrorHandler } from './error-handler';
import { CacheManagerService } from '../common/services/cache-manager.service';
import { UserService } from '../user/shared/user.service';

// import { ErrorLogService } from './error-log.service';
// import { LogglyLoggerService } from './loggly-logger.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UserService,
    CountryService,
    MessageService,
    CacheManagerService,
    ErrorHandler,
    // ErrorLogService,
    // LogglyLoggerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    // {
    //   provide: ErrorHandling,
    //   useClass: ErrorHandler
    // }
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
