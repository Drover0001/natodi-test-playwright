import { expect, Locator } from '@playwright/test';
import { AppPage } from '../abstractions/abstractClasses';
import { bookingWidgetData } from '../../testData/bookingWidget.data';

export class BookingWidgetPage extends AppPage {
  public pagePath = '';
  private servicesLabel: Locator = this.page.locator('app-services-data-card');
  private masterLabel: Locator = this.page.locator('app-employee-data-card');
  private dateTimeLabel: Locator = this.page.locator('app-date-data-card');
  private continueButton: Locator = this.page.locator('app-loader-button button[type="submit"]');

  async expectLoaded() {
    await expect(this.page).toHaveTitle(bookingWidgetData.pageTitle);
    await expect(this.servicesLabel).toBeVisible();
    await expect(this.masterLabel).toBeVisible();
    await expect(this.dateTimeLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async clickContinueToContactDetailsPage(): Promise<void> {
    await this.continueButton.click();
  }

  async assertStepCardsAreVisible(): Promise<void> {
    await expect(this.servicesLabel).toBeVisible();
    await expect(this.masterLabel).toBeVisible();
    await expect(this.dateTimeLabel).toBeVisible();
  }

  async assertContinueButtonEnabled(): Promise<void> {
    await expect(this.continueButton).toBeVisible();
    await expect(this.continueButton).toBeEnabled();
  }
  
}
