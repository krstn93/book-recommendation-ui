import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../config/app-config.service';
import { BooksResponse } from './models/books-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly configService = inject(AppConfigService);
  private readonly httpClient = inject(HttpClient);

  getBooks(cursor?: string, pageSize?: number): Observable<BooksResponse> {
    let params = new HttpParams();

    if (cursor) {
      params = params.set('cursor', cursor);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.httpClient.get<BooksResponse>(
      `${this.configService.bookRecommendationApiBaseUrl}/Books`,
      { params },
    );
  }
}
