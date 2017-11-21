/**
 * Created by TBaker on 3/8/2017.
 */
import { environment } from '../../environments/environment';

export let CONFIG = {
  appUrl: environment.appUrl,
  baseUrls: {
    auth: `${environment.apiUrl}/auth`,
    users: `${environment.apiUrl}/users`,
    passwordreset: `${environment.apiUrl}/password-reset`,
    businesses: `${environment.apiUrl}/businesses`,
    countries: `${environment.apiUrl}/countries`,
    categories: `${environment.apiUrl}/categories`,
    themes: `${environment.apiUrl}/themes`,
    topics: `${environment.apiUrl}/topics`,
    services: `${environment.apiUrl}/services`,
    keywords: `${environment.apiUrl}/keywords`,
    logs: `${environment.apiUrl}/logs`,
    notifications: `${environment.apiUrl}/notifications`,
  },
  paging: {
    limit: 20,
    limitOptions: [5, 20, 50, 100]
  },
  defaultCountry: {
    name: 'U.S. Virgin Islands',
    code: 'vi',
  },
  tokenExpiration: 7,
  searchHistoryLimit: 5,
  vars: {
    currentUser: 'currentUser',
    currentToken: 'currentToken',
    currentCountry: 'currentCountry',
    searchHistory: 'searchHistory',
    tokenExpiredError: 'TokenExpiredException',
    xInlineCount: 'X-Inline-Count',
    logging: 'Logging'
  },
  dialog: {
    confirm: {
      disableClose: true,
      width: '448px',
      hasBackdrop: false
    }
  },
  cloudinary: {
    cloud_name: environment.cloudinary.cloud_name,
    upload_preset: environment.cloudinary.upload_preset
  },
  google_maps: {
    apiKey: environment.google_maps.apiKey
  },
  loggly: {
    customer_Token: environment.loggly.customer_Token
  }
};
