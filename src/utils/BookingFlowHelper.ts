import { BookingFlowDateTimePage } from '../app/page/BookingFlowDateTimePage';
import { BookingFlowMasterPage } from '../app/page/BookingFlowMasterPage';

export class BookingFlowHelper {
    constructor(
        private bookingFlowDateTimePage: BookingFlowDateTimePage,
        private bookingFlowMasterPage: BookingFlowMasterPage,
    ) { }

    async selectTimeSlotWithAvailableMaster(maxAttempts = 5): Promise<void> {
        await this.bookingFlowDateTimePage.clickFirstAvailableTimeSlot();
        await this.bookingFlowDateTimePage.assertTimeSlotSelected();

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await this.bookingFlowMasterPage.clickGoToMasterButton();
            if (await this.bookingFlowMasterPage.hasAvailableMasters()) {
                return;
            }

            await this.bookingFlowMasterPage.clickBackButtonFromMasterPage();
            await this.bookingFlowDateTimePage.clickGoToDateTimeButton();
            const slotCount = await this.bookingFlowDateTimePage.availableTimeSlotCount();
            if (slotCount === 0) {
                throw new Error('No time slots are showing after returning from the master step.');
            }
            await this.bookingFlowDateTimePage.clickTimeSlot((attempt + 1) % slotCount);
            await this.bookingFlowDateTimePage.assertTimeSlotSelected();
        }

        throw new Error(`No time slot with an available master was found after ${maxAttempts} attempts.`);
    }
}
