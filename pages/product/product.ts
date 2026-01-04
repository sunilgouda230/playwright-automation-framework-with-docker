import { Page, Locator } from '@playwright/test';
import BasePage from '../basepage';
import NavMenu from '../../constants/navmenu';
import common from '../../constants/common';
import Category from './category';
import Brand from './brand';

export default class Products extends BasePage {

    private getAllProducts: Locator;
    private addTOCartButton: Locator;
    private productHeader: Locator;
    private category: Category;
    private brand: Brand

    constructor(page: Page) {
        super(page);
        this.getAllProducts = page.locator('p');
        this.addTOCartButton = page.locator('//div[@class="product-overlay"]');
        this.productHeader = page.locator('h2.title');
        this.category = new Category(page);
        this.brand = new Brand(page);
    }

    async clickOnProductMenu(): Promise<void> {
        await this.clickOnMenuItem(NavMenu.PRODUCTS);
    }

    async getProductsCount(): Promise<number> {
        return await this.getAllProducts.count();
    }

    async verifyProductName(productName: string): Promise<string> {
        return await this.getAllProducts.filter({ hasText: productName }).first().textContent() ?? '';
    }

    async hoverOnProductByProductName(productName: string): Promise<void> {
        await this.getAllProducts.filter({ hasText: productName }).first().hover();
    }

    async clickOnProductByProductName(productName: string): Promise<void> {
        const productCard = this.page.locator(
            `//p[text()='${productName}']/ancestor::div[contains(@class,'product-image-wrapper')]`
        );
        await productCard.hover();
        await productCard.locator("a.add-to-cart").first().click();
    }

    async getProductHeaderText(): Promise<string> {
        return await this.productHeader.textContent() ?? '';
    }

    getCategory(): Category {
        return this.category;
    }

    getBrand(): Brand {
        return this.brand;
    }

}