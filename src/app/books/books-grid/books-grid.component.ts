import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { BookService } from '../book.service';
import { BookViewModel } from '../models/book-view.model';

const BooksPageSize = 9;

@Component({
  selector: 'app-books-grid',
  standalone: true,
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksGridComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  books: BookViewModel[] = [];
  errorMessage = '';
  isLoading = true;
  isLoadingMore = false;
  nextCursor: string | null = null;

  ngOnInit(): void {
    this.loadBooks();
  }

  loadMore(): void {
    if (!this.nextCursor || this.isLoadingMore) {
      return;
    }

    this.loadBooks(this.nextCursor);
  }

  private loadBooks(cursor?: string): void {
    const isFirstPage = !cursor;

    if (isFirstPage) {
      this.isLoading = true;
    } else {
      this.isLoadingMore = true;
    }

    this.errorMessage = '';

    this.bookService
      .getBooks(cursor, BooksPageSize)
      .pipe(
        catchError(() => {
          this.errorMessage =
            'Books could not be loaded. Check that the API is running and try again.';

          return of({ result: [], nextCursor: isFirstPage ? null : this.nextCursor });
        }),
        finalize(() => {
          if (isFirstPage) {
            this.isLoading = false;
          } else {
            this.isLoadingMore = false;
          }

          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe((response) => {
        const books = response.result.map((book) => new BookViewModel(book));
        this.books = isFirstPage ? books : [...this.books, ...books];
        this.nextCursor = response.nextCursor;
      });
  }
}
