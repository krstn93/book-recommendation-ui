import { Book } from './book.model';

export interface BooksResponse {
  result: Book[];
  nextCursor: string | null;
}
