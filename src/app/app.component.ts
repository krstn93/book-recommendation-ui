import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BooksGridComponent } from './books/books-grid/books-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksGridComponent, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'My Bookshelves',
      icon: 'pi pi-book',
    },
  ];
}
