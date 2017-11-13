/**
 * Created by TBaker on 3/8/2017.
 */
import { environment } from '../../environments/environment';

const serverUrl: string = environment.production ? 'https://api.islandir.com' : 'http://localhost:9000';
const clientUrl: string = environment.production ? 'https://islandir.com' : 'http://localhost:4200';

export let CONFIG = {
  appUrl: clientUrl,
  baseUrls: {
    auth: `${serverUrl}/auth`,
    users: `${serverUrl}/users`,
    passwordreset: `${serverUrl}/password-reset`,
    businesses: `${serverUrl}/businesses`,
    countries: `${serverUrl}/countries`,
    categories: `${serverUrl}/categories`,
    themes: `${serverUrl}/themes`,
    topics: `${serverUrl}/topics`,
    services: `${serverUrl}/services`,
    keywords: `${serverUrl}/keywords`,
    logs: `${serverUrl}/logs`,
    notifications: `${serverUrl}/notifications`,
    businessLogo: `${clientUrl}/assets/uploads/store-0.png`
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
    cloud_name: 'brackio',
    upload_preset: 'y76dn5uy'
  },
  google_maps: {
    apiKey: 'AIzaSyArni8aOHxdjWg7Ats5rbQAU9XR56X2gZg'
  },
  loggly: {
    customer_Token: '51410798-0ec0-4c89-8cab-5ecf6fe5be35'
  }
};
