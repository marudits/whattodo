import { PageListModule } from './page-list.module';

describe('PageListModule', () => {
  let pageListModule: PageListModule;

  beforeEach(() => {
    pageListModule = new PageListModule();
  });

  it('should create an instance', () => {
    expect(pageListModule).toBeTruthy();
  });
});
