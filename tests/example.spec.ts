import NavMenu from '../constants/navmenu';
import { test, expect } from '../fixtures/baseTest';
import Navbar from '../pages/navbar';
import Products from '../pages/product/product';
import ProductWithsearch from '../pages/productWithsearch';


test('Testing environment variable', async ({ page }) => {
    const product = new Products(page);
    await product.clickOnProductMenu();
    console.log("Product menu clicked successfully");

    console.log(await product.getProductsCount());
    const productName = 'Sleeveless Dress';
    const productText = await product.verifyProductName(productName);
    expect(productText).toContain(productName);
    console.log(`Product name verified: ${productText}`);

    await product.hoverOnProductByProductName(productName);
    console.log(`Hovered over product: ${productName}`);

    await product.clickOnProductByProductName(productName);
    console.log(`Clicked on product: ${productName}`);

    await page.pause();
});

test('Search functionality', async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.clickOnMenuItem(NavMenu.PRODUCTS);
    
    console.log("Navigated to Products page via Navbar");
    const search = new Products(page);
    const productWithSearch = new ProductWithsearch(page);
    const productName = 'Men Tshirt';

    await productWithSearch.searchAndVerifyTheProduct(productName);
    console.log(`Searched for product: ${productName}`);

});