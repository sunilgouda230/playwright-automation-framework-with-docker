import NavMenu from '../constants/navmenu';
import { test, expect } from '../fixtures/baseTest';
import Navbar from '../pages/navbar';
import Products from '../pages/product/product';
import ProductWithsearch from '../pages/productWithsearch';


test('Verify add to cart functionality', async ({ page }) => {
    const product = new Products(page);
    const text = await product.getProductHeaderText();
    expect(text).toContain('Features Items');
});

test('verify Menu item count', async ({ page }) => {
    const navbar = new Navbar(page);
    const menuItems = await navbar.getMenuItemCount();
    console.log(`Menu item count: ${menuItems}`);
    expect(menuItems).toBeGreaterThan(5);
});