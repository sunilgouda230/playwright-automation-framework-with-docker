import { test, expect } from '../fixtures/baseTest';
import { Page } from '@playwright/test';
import Navbar from './navbar';
import NavMenu from '../constants/navmenu';

export default class BasePage {

  page: Page;
  navbar: Navbar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
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

    async clickOnMenuItem(itemName: NavMenu) {
        await this.navbar.clickOnMenuItem(itemName);
    }

    async getNavbar(): Promise<Navbar> {
        return this.navbar;
    }

}