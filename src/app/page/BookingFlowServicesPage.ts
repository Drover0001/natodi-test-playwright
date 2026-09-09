import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractions/abstractClasses';

export class BookingFlowServicesPage extends Component {
    public pagePath = '/services';
    private backButton: Locator = this.page.locator('.header button.default');
    private dateTimeStepFooterNav: Locator = this.page.locator('.continue-block-btn-group__item:has(i.icon-calendar)');
    private servicesCard: Locator = this.page.locator('app-services-data-card');
    private serviceRow(name: string): Locator {
        return this.page.locator(`app-short-info-card:has(.title:text-is("${name}"))`);
    }

    async expectLoaded(): Promise<void> {
        await expect(this.backButton).toBeVisible();
    }

    async clickGoToServicesButton(): Promise<void> {
        await this.servicesCard.click();
    }

    async clickSelectService(name: string): Promise<void> {
        await this.serviceRow(name).locator('.counter-btn--add').click();
    }

    async assertServiceSelected(name: string): Promise<void> {
        await expect(this.serviceRow(name).locator('.counter-value')).toHaveText('1');
    }

    async assertServicesAreVisible(name: string): Promise<void> {
        await expect(this.serviceRow(name)).toBeVisible();
    }

    async clickServiceTimeFooter(): Promise<void> {
        await this.dateTimeStepFooterNav.click();
    }

    async clickBackButtonFromServicesPage(): Promise<void> {
        await this.backButton.click();
    }

}
