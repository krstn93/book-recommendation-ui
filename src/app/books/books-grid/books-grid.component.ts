import { Component, OnInit, inject } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { BookService } from '../book.service';
import { BookViewModel } from '../models/book-view.model';

@Component({
  selector: 'app-books-grid',
  standalone: true,
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.css',
})
export class BooksGridComponent implements OnInit {
  private readonly bookService = inject(BookService);

  books: BookViewModel[] = [];
  errorMessage = '';
  isLoading = true;
  nextCursor: string | null = null;

  ngOnInit(): void {
    this.bookService
      .getBooks()
      .pipe(
        catchError(() => {
          this.errorMessage =
            'Books could not be loaded. Check that the API is running and try again.';

          return of({ result: [], nextCursor: null });
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((response) => {
        this.books = response.result.map((book) => new BookViewModel(book));
        this.nextCursor = response.nextCursor;
      });
  }
}
