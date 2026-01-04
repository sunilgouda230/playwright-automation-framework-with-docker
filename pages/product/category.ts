import {Locator, Page} from '@playwright/test';
import CategoryType from '../../constants/products/category/categorytype';
import CategorySubType from '../../constants/products/category/categorysubtypes';

export default class Category {

    page:Page;
    category:Locator

    constructor(page: Page) {
        this.page = page;
        this.category = page.locator('div.category-products');
    }

    async getCategoryTitles(): Promise<string[]> {
        return await this.category.locator('h4 a').allTextContents();
    }

    async getCountOfCategories(): Promise<number> {
        return await this.category.locator('h4 a').count();
    }

    async getSubCategoryTitles(category:CategoryType): Promise<string[]> {
        const products = await this.category.locator(`#${category} a`).allTextContents();
        return products;
    }

    async getCountOfSubCategories(category:CategoryType): Promise<number> {
        return await this.category.locator(`#${category} a`).count();
    }

    async clickCategory(category: CategoryType): Promise<void> {
        await this.category.locator(`h4 a:has-text("${category}")`).click();
    }

    async clickSubCategory(category: CategoryType, subCategory: CategorySubType): Promise<void> {
        await this.category.locator(`h4 a:has-text("${category}")`).click();
        await this.category.locator(`#${category} a:has-text("${subCategory}")`).click();
    }

}
    