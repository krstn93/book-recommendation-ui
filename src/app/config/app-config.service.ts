import { Injectable } from '@angular/core';
import { AppConfig, AppEnvironment } from './app-config.model';

const APP_CONFIGS: Record<AppEnvironment, AppConfig> = {
  dev: {
    environment: 'dev',
    apis: {
      bookRecommendationApi: 'http://localhost:5077',
    },
  },
  tst: {
    environment: 'tst',
    apis: {
      bookRecommendationApi: 'https://test.book-recommendation-api.example.com',
    },
  },
  stg: {
    environment: 'stg',
    apis: {
      bookRecommendationApi: 'https://staging.book-recommendation-api.example.com',
    },
  },
  prd: {
    environment: 'prd',
    apis: {
      bookRecommendationApi: 'https://book-recommendation-api.example.com',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private readonly config = APP_CONFIGS[this.resolveEnvironment()];

  get environment(): AppEnvironment {
    return this.config.environment;
  }

  get bookRecommendationApiBaseUrl(): string {
    return this.config.apis.bookRecommendationApi;
  }

  private resolveEnvironment(): AppEnvironment {
    const hostName = window.location.hostname.toLowerCase();

    if (hostName.includes('stg') || hostName.includes('staging')) {
      return 'stg';
    }

    if (hostName.includes('tst') || hostName.includes('test')) {
      return 'tst';
    }

    if (hostName === 'localhost' || hostName === '127.0.0.1') {
      return 'dev';
    }

    return 'prd';
  }
}
