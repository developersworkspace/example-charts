import { ExampleChartsPage } from './app.po';

describe('example-charts App', function() {
  let page: ExampleChartsPage;

  beforeEach(() => {
    page = new ExampleChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
