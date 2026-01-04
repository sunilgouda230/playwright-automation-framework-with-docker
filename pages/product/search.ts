import {Locator, Page} from '@playwright/test';

export default class Search {

    page: Page;
    searchInput: Locator;
    searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
    }

    async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async enterSearchTerm(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
    }

    async submitSearch(): Promise<void> {
        await this.searchButton.click();
    }

}