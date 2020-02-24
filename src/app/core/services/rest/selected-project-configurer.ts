import {CookieService} from "ngx-cookie-service";

export abstract class SelectedProjectConfigurer {

  protected selectedProjectName: string = '';

  constructor(cookieService: CookieService) {
    this.selectedProjectName = cookieService.get('selectedProject');
  }

  protected abstract createHttpClient();

  setProjectHeader(selectedProjectName: string) {
    this.selectedProjectName = selectedProjectName;
    this.createHttpClient();
  }
}
