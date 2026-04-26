import { Book } from './book.model';

export class BookViewModel implements Book {
  readonly isbn: string;
  readonly title: string;
  readonly author: string;
  readonly publishedDate: string;
  readonly rating: number;
  readonly coverUrl: string;
  readonly publishedYear: string;

  constructor(book: Book) {
    this.isbn = book.isbn;
    this.title = book.title;
    this.author = book.author;
    this.publishedDate = book.publishedDate;
    this.rating = book.rating;
    this.coverUrl = book.coverUrl;
    this.publishedYear = book.publishedDate
      ? new Date(book.publishedDate).getFullYear().toString()
      : '';
  }
}
