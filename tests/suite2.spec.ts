import NavMenu from '../constants/navmenu';
import BrandType from '../constants/products/brandtypes';
import CategorySubType from '../constants/products/category/categorysubtypes';
import CategoryType from '../constants/products/category/categorytype';
import { test, expect } from '../fixtures/baseTest';
import Navbar from '../pages/navbar';
import Products from '../pages/product/product';
import ProductWithsearch from '../pages/productWithsearch';


test('verify category selection functionality', async ({ page }) => {
    const product = new Products(page);
    await product.clickOnProductMenu();
    console.log("Product menu clicked successfully");

    await product.getCategory().clickSubCategory(CategoryType.WOMEN,CategorySubType.DRESS);

    expect(await product.getProductHeaderText()).toContain(CategoryType.WOMEN);

});

test('verify brand selection functionality', async ({ page }) => {
    const product = new Products(page);
    await product.clickOnProductMenu();
    console.log("Product menu clicked successfully");

    await product.getBrand().clickBrand(BrandType.POLO);

    expect(await product.getProductHeaderText()).toContain(BrandType.POLO);

});

test('verify category count on product page', async ({ page }) => {
    const product = new Products(page);
    await product.clickOnProductMenu();
    console.log("Product menu clicked successfully");

    const categoryCount = await product.getCategory().getCountOfCategories();
    expect(categoryCount).toBe(3);

});

test('verify brand count on product page', async ({ page }) => {
    const product = new Products(page);
    await product.clickOnProductMenu();
    console.log("Product menu clicked successfully");

    const brandCount = await product.getBrand().getCountOfBrands();

    expect(brandCount).toBe(8);

});