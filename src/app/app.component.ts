import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BookModule } from './books/book.module';
import { ChatModule } from './chat/chat.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookModule, ChatModule, MenubarModule],
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
