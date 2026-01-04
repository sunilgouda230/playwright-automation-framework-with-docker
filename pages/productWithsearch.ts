import Products from "./product/product";
import search from "./product/search";
import Search from "./product/search";
import { Page } from "@playwright/test";

export default class ProductWithsearch extends Products{

    private search: Search;

    // Implementation will go here in the future
    constructor(page: Page) {
        super(page);
        this.search = new search(page);
    }

    async searchAndVerifyTheProduct(productName: string): Promise<void> {
        await this.search.searchForProduct(productName);
        await this.verifyProductName(productName);
    }



}   