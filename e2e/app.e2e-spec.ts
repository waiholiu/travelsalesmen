import { TravelSalesmanPage } from './app.po';

describe('travel-salesman App', () => {
  let page: TravelSalesmanPage;

  beforeEach(() => {
    page = new TravelSalesmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
