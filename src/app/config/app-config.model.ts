export type AppEnvironment = 'dev' | 'tst' | 'stg' | 'prd';

export interface ApiUrls {
  bookRecommendationApi: string;
}

export interface AppConfig {
  environment: AppEnvironment;
  apis: ApiUrls;
}
