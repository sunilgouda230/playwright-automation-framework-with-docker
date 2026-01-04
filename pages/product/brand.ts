import {Locator, Page} from '@playwright/test';
import BrandType from '../../constants/products/brandtypes';

export default class Brand {

    page: Page;
    brand: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brand = page.locator('div.brands-name');
    }

    async getBrandTitles(): Promise<string[]> {
        return await this.brand.locator('li a').allTextContents();
    }

    async clickBrand(brand: BrandType): Promise<void> {
        await this.brand.locator(`li a:has-text("${brand}")`).click();
    }

}