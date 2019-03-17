import { PageAuthModule } from './page-auth.module';

describe('PageAuthModule', () => {
  let pageAuthModule: PageAuthModule;

  beforeEach(() => {
    pageAuthModule = new PageAuthModule();
  });

  it('should create an instance', () => {
    expect(pageAuthModule).toBeTruthy();
  });
});
