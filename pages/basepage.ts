import { test, expect } from '../fixtures/baseTest';
import { Page } from '@playwright/test';

export default class BasePage {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

    async clickElement(selector: string) {
    await this.page.click(selector);
    }

    async getElementText(selector: string): Promise<string> {
        return (await this.page.textContent(selector)) ?? '';
    }



}