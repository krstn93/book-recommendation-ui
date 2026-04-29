import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('defines the primary navigation menu items', () => {
    const component = new AppComponent();

    expect(component.menuItems).toEqual([
      jasmine.objectContaining({
        label: 'Home',
        icon: 'pi pi-home',
      }),
      jasmine.objectContaining({
        label: 'My Bookshelves',
        icon: 'pi pi-book',
      }),
    ]);
  });
});
