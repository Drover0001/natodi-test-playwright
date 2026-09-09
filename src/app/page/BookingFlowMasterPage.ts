import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractions/abstractClasses';

export class BookingFlowMasterPage extends Component {
    public pagePath = '/master';
    private masterCards: Locator = this.page.locator('app-short-info-card');
    private backButton: Locator = this.page.locator('.header button.default');
    private continueLink: Locator = this.page.locator('.continue-block-btn-group__item:has(i.icon-arrow-left)');
    private goToMasterStepTrigger: Locator = this.page.locator('.continue-block-btn-group__item:has(i.icon-people)');
    private selectedMasterCard: Locator = this.page.locator('app-short-info-card:has(.short-card.selected)');

    async expectLoaded(): Promise<void> {
        await expect(this.masterCards.first()).toBeVisible();
    }

    async clickGoToMasterButton(): Promise<void> {
        await this.goToMasterStepTrigger.click();
    }
    async assertMasterListsAreVisible(): Promise<void> {
        await expect(this.masterCards.first()).toBeVisible();
    }

    async hasAvailableMasters(): Promise<boolean> {
        try {
            await this.masterCards.first().waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async clickBackButtonFromMasterPage(): Promise<void> {
        await this.backButton.click();
    }

    async clickToSelectAvailableMaster(): Promise<void> {
        await this.masterCards.first().click();
    }
    async assertMasterSelected(): Promise<void> {
        await expect(this.selectedMasterCard).toBeVisible();
    }
    async clickContinueWithMasterSelection(): Promise<void> {
        await this.continueLink.click();
    }
    
}
