import { TaxonomyPrototypePage } from './app.po';

describe('taxonomy-prototype App', function() {
  let page: TaxonomyPrototypePage;

  beforeEach(() => {
    page = new TaxonomyPrototypePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
