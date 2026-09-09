import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractions/abstractClasses';

export class BookingFlowDateTimePage extends Component {
    public pagePath = '/datetime';
    private goToDateTimeStepLink: Locator = this.page.locator('app-date-data-card');
    private timeSlots: Locator = this.page.locator('.time-cell');
    private enabledDateCells: Locator = this.page.locator('td:not(.myDpDisabled) .myDpDayValue');
    private disabledDateCells: Locator = this.page.locator('td.myDpDisabled .myDpDayValue');
    private selectedDateTitle: Locator = this.page.locator('.selected-date .title');
    private selectedTimeSlot: Locator = this.page.locator('.time-cell.selected');

    async expectLoaded(): Promise<void> {
        await expect(this.selectedDateTitle).toBeVisible();
    }

    async clickGoToDateTimeButton(): Promise<void> {
        await this.goToDateTimeStepLink.click();
    }

    async assertCalendarsAreVisible(): Promise<void> {
        await expect(this.enabledDateCells.first()).toBeVisible();
    }

    private async clickNextDateWithAvailableSlots(): Promise<void> {
        const enabledDatesCount = await this.enabledDateCells.count();
        for (let i = 1; i < enabledDatesCount; i++) {
            await this.enabledDateCells.nth(i).click();
            if (await this.hasAvailableTimeSlot()) {
                return;
            }
        }
        throw new Error('No date with available time slots was found in the current month.');
    }

    async clickFirstAvailableTimeSlot(): Promise<void> {
        if (!(await this.hasAvailableTimeSlot())) {
            await this.clickNextDateWithAvailableSlots();
        }
        await this.timeSlots.first().click();
    }

    async availableTimeSlotCount(): Promise<number> {
        await this.timeSlots.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        return this.timeSlots.count();
    }

    async clickTimeSlot(index: number): Promise<void> {
        await this.timeSlots.nth(index).click();
    }

    async assertTimeSlotSelected(): Promise<void> {
        await expect(this.selectedTimeSlot).toBeVisible();
    }

    private async hasAvailableTimeSlot(): Promise<boolean> {
        try {
            await this.timeSlots.first().waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async showsSelectedDateLabel(): Promise<string> {
        return await this.selectedDateTitle.innerText();
    }

    async assertSelectedDateLabelExists(expected: string): Promise<void> {
        await expect(this.selectedDateTitle).toHaveText(expected, { ignoreCase: true });
    }

    async clickToSelectUnavailableDate(): Promise<void> {
        await this.disabledDateCells.first().click({ force: true });
    }
    
}