import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';
//import { HomePage } from '../pages/HomePage';

test('verify valid login', async ({ page }) => {

    //AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    const actualTitle = await loginPage.doLogin( loginData.validUser.email, loginData.validUser.password );
    await expect(page).toHaveTitle(actualTitle);

});

test('verify Invalid login', async ({ page }) => {
    //AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin( loginData.invalidUser.email, loginData.invalidUser.password );
    const errorMesg = await loginPage.getInvalidLoginMessage();
    expect(errorMesg).toContain('Warning: No match for E-Mail Address and/or Password.')

});

    