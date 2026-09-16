import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
//import { HomePage } from '../pages/HomePage';

test('verify valid login', async ({ page }) => {

    //AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    const actualTitle = await loginPage.doLogin('pw@abc.com', 'Test@1');
    await expect(page).toHaveTitle(actualTitle);

})

    