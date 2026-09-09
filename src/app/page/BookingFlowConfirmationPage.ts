import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractions/abstractClasses';

export class BookingFlowConfirmationPage extends Component {
    public pagePath = '/confirmation';
    private confirmationTitle: Locator = this.page.locator('.success-moment .title');

    async expectLoaded(): Promise<void> {
        await expect(this.confirmationTitle).toBeVisible();
    }

    async assertBookingConfirmed(): Promise<void> {
        await this.expectLoaded();
    }
    
} 