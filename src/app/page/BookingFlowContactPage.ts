import { expect, Locator } from '@playwright/test';
import { Component } from '../abstractions/abstractClasses';

export class BookingFlowContactPage extends Component {
    public pagePath = '/contact';
    private firstNameInput: Locator = this.page.locator('app-input[formcontrolname="first_name"] input');
    private phoneInput: Locator = this.page.locator('app-input[formcontrolname="phone_number"] input');
    private invalidPhoneNumberError: Locator = this.page.locator('app-input[formcontrolname="phone_number"] .infoText');
    private submitButton: Locator = this.page.locator('app-loader-button button[type="submit"]');

    async expectLoaded(): Promise<void> {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
        await expect(this.submitButton).toBeVisible();
    }

    async assertContactFormIsVisible(): Promise<void> {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.phoneInput).toBeVisible();
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async assertFirstNameEntered(firstName: string): Promise<void> {
        await expect(this.firstNameInput).toHaveValue(firstName);
    }

    async clickPhoneInput(): Promise<void> {
        await this.phoneInput.click();
    }

    async assertPhoneInputFocused(): Promise<void> {
        await expect(this.phoneInput).toBeFocused();
    }

    async fillPhoneNumber(phone: string): Promise<void> {
        await this.phoneInput.pressSequentially(phone, { delay: 30 });
    }

    async assertPhoneNumberEntered(phone: string): Promise<void> {
        const value = await this.phoneInput.inputValue();
        expect(value.replace(/\D/g, '').endsWith(phone)).toBe(true);
    }

    async clickInputOutside(): Promise<void> {
        await this.phoneInput.blur();
    }

    async assertInvalidPhoneNumberError(): Promise<void> {
        await expect(this.invalidPhoneNumberError).toBeVisible();
    }

    async assertSubmitEnabled(): Promise<void> {
        await expect(this.submitButton).toBeEnabled();
    }

    async clickSubmitBooking(): Promise<void> {
        await this.submitButton.click();
    }
    
}
