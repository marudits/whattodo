import { PageDashboardModule } from './page-dashboard.module';

describe('PageDashboardModule', () => {
  let pageDashboardModule: PageDashboardModule;

  beforeEach(() => {
    pageDashboardModule = new PageDashboardModule();
  });

  it('should create an instance', () => {
    expect(pageDashboardModule).toBeTruthy();
  });
});
