import { Page, Locator } from '@playwright/test';
import BasePage from '../basepage';
import NavMenu from '../../constants/navmenu';
import common from '../../constants/common';

export default class Products extends BasePage {

    private getAllProducts: Locator;
    private addTOCartButton: Locator;

    constructor(page : Page) {
        super(page);
        this.getAllProducts = page.locator('p');
        this.addTOCartButton = page.locator('//div[@class="product-overlay"]');
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
}