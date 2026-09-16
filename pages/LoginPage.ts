import { Locator, Page} from '@playwright/test'
import { ElementUtil } from '../utils/ElementUtil';
//import { HomePage } from '../pages/HomePage';

export class LoginPage{

  //1. page locators/objects/OR:
  private readonly page: Page;
  private readonly eleUtil;
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly warningMsg: Locator;

  //2. page class constructor...
  constructor(page: Page){
    this.page = page;
    this.eleUtil = new ElementUtil(page);   
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.locator(`input[type="submit"][value="Login"]`);
    this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
  }
  
//3. page actions/methods:
async goToLoginPage(){
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
}
/**
 * 
 * @param email 
 * @param password 
 * @returns
 */
async doLogin(email: string, password: string): Promise<string> {
   await this.eleUtil.fill(this.emailId, email);
   await this.eleUtil.fill(this.password, password);
   await this.eleUtil.click(this.loginBtn,{ force: true, timeout : 5000});
   const pageTitle = await this.page.title();
   console.log(`Home Page Title: ${pageTitle}`)
   return pageTitle;
   //return new HomePage(this.page); 
}

async getInvalidLoginMessage(): Promise<string | null>{
    const errorMesg = await this.eleUtil.getText(this.warningMsg);
    console.log('invalid login warning message: ' + errorMesg);
    return errorMesg;
}

}