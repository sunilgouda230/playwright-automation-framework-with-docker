import {Page ,Locator} from "@playwright/test";
import NavMenu from "../constants/navmenu";

export default class Navbar {

    private navLocators: Locator;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.navLocators = page.locator('div.shop-menu li a');
    }

    async clickOnMenuItem(itemName: NavMenu) {
        await this.navLocators.locator(`text=${itemName}`).click();
    }

    async getMenuItemCount(): Promise<number> {
        return await this.navLocators.count();  
    }

}