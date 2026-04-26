import { NgModule } from '@angular/core';
import { BooksGridComponent } from './books-grid/books-grid.component';

@NgModule({
  imports: [BooksGridComponent],
  exports: [BooksGridComponent],
})
export class BookModule {}
