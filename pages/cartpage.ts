import BasePage from './basepage';
import { Page } from '@playwright/test';

export default class CartPage  extends BasePage {
    constructor(page : Page) {
        super(page);
    }
}