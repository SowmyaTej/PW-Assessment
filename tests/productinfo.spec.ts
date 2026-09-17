
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { loginData } from '../test-data/loginData';
import { productData } from '../test-data/productData';


for (let product of productData) {

    test(`verify product Header ${product.productname}`, async ({ page }) => {

        let loginPage = new LoginPage(page);

        await loginPage.goToLoginPage();

         await loginPage.doLogin(
            loginData.validUser.email,
            loginData.validUser.password
        );

        let homePage = new HomePage(page);

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

        let productInfoPage: ProductInfoPage =
            await resultsPage.selectProduct(product.productname);

        expect(await productInfoPage.getProductHeader())
            .toBe(product.productname);

    });
}


for (let product of productData) {

    test(`verify product Images ${product.productname} : ${product.imagecount}`,
        async ({ page }) => {

            let loginPage = new LoginPage(page);

            await loginPage.goToLoginPage();

           await loginPage.doLogin(
            loginData.validUser.email,
            loginData.validUser.password
        );

        let homePage = new HomePage(page);

            let resultsPage: ResultsPage =
                await homePage.doSearch(product.searchkey);

            let productInfoPage: ProductInfoPage =
                await resultsPage.selectProduct(product.productname);

            expect(await productInfoPage.getProductImagesCount())
                .toBe(product.imagecount);

        });
}


test('verify product MetaData', async ({ page }) => {

    let loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();

    await loginPage.doLogin(
            loginData.validUser.email,
            loginData.validUser.password
        );

        let homePage = new HomePage(page);

    let resultsPage: ResultsPage =
        await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage =
        await resultsPage.selectProduct('MacBook Pro');

    let actualProductFullDetails =
        await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header'))
        .toBe('MacBook Pro');

    expect.soft(actualProductFullDetails.get('Brand'))
        .toBe('Apple');

    expect.soft(actualProductFullDetails.get('Product Code'))
        .toBe('Product 18');

    expect.soft(actualProductFullDetails.get('Reward Points'))
        .toBe('800');

    expect.soft(actualProductFullDetails.get('Availability'))
        .toBe('Out Of Stock');
});


test('verify product Pricing', async ({ page }) => {

    let loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();

    await loginPage.doLogin(
            loginData.validUser.email,
            loginData.validUser.password
        );

        let homePage = new HomePage(page);

        
    let resultsPage: ResultsPage =
        await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage =
        await resultsPage.selectProduct('MacBook Pro');

    let actualProductFullDetails =
        await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header'))
        .toBe('MacBook Pro');

    expect.soft(actualProductFullDetails.get('price'))
        .toBe('$2,000.00');

    expect.soft(actualProductFullDetails.get('extaxprice'))
        .toBe('$2,000.00');
});

