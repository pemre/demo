import { HotelAngular2Page } from './app.po';

describe('hotel-angular2 App', () => {
  let page: HotelAngular2Page;

  beforeEach(() => {
    page = new HotelAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
