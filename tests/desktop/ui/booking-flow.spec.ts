import { test, expect } from '../../../src/fixture';
import { bookingFlowData } from '../../../src/testData/bookingWidget.data';

test('client books a service and sees the confirmation', async ({ app }) => {
  await app.bookingWidgetPage.open();
  await app.bookingFlowServicesPage.clickGoToServicesButton();
  await app.bookingFlowServicesPage.assertServicesAreVisible(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickSelectService(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.assertServiceSelected(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickServiceTimeFooter();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();
  await app.bookingFlowServicesPage.clickBackButtonFromServicesPage();
  await app.bookingWidgetPage.assertStepCardsAreVisible();

  await app.bookingFlowDateTimePage.clickGoToDateTimeButton();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();
  await app.bookingFlowHelper.selectTimeSlotWithAvailableMaster();
  await app.bookingFlowMasterPage.assertMasterListsAreVisible();
  await app.bookingFlowMasterPage.clickToSelectAvailableMaster();
  await app.bookingFlowMasterPage.assertMasterSelected();
  await app.bookingFlowMasterPage.clickContinueWithMasterSelection();
  await app.bookingWidgetPage.assertContinueButtonEnabled();

  await app.bookingWidgetPage.clickContinueToContactDetailsPage();
  await app.bookingFlowContactPage.assertContactFormIsVisible();
  await app.bookingFlowContactPage.fillFirstName(bookingFlowData.clientFirstName);
  await app.bookingFlowContactPage.assertFirstNameEntered(bookingFlowData.clientFirstName);
  await app.bookingFlowContactPage.clickPhoneInput();
  await app.bookingFlowContactPage.assertPhoneInputFocused();
  await app.bookingFlowContactPage.fillPhoneNumber(bookingFlowData.validPhoneNumber);
  await app.bookingFlowContactPage.assertPhoneNumberEntered(bookingFlowData.validPhoneNumber);
  await app.bookingFlowContactPage.clickInputOutside();
  await app.bookingFlowContactPage.assertSubmitEnabled();
  await app.bookingFlowContactPage.clickSubmitBooking();
  await app.bookingFlowConfirmationPage.assertBookingConfirmed();
});

test('shows a validation error for an invalid phone number', async ({ app }) => {
  await app.bookingWidgetPage.open();
  await app.bookingFlowServicesPage.clickGoToServicesButton();
  await app.bookingFlowServicesPage.assertServicesAreVisible(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickSelectService(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.assertServiceSelected(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickServiceTimeFooter();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();
  await app.bookingFlowServicesPage.clickBackButtonFromServicesPage();
  await app.bookingWidgetPage.assertStepCardsAreVisible();

  await app.bookingFlowDateTimePage.clickGoToDateTimeButton();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();
  await app.bookingFlowHelper.selectTimeSlotWithAvailableMaster();
  await app.bookingFlowMasterPage.assertMasterListsAreVisible();
  await app.bookingFlowMasterPage.clickToSelectAvailableMaster();
  await app.bookingFlowMasterPage.assertMasterSelected();
  await app.bookingFlowMasterPage.clickContinueWithMasterSelection();
  await app.bookingWidgetPage.assertContinueButtonEnabled();

  await app.bookingWidgetPage.clickContinueToContactDetailsPage();
  await app.bookingFlowContactPage.assertContactFormIsVisible();
  await app.bookingFlowContactPage.fillFirstName(bookingFlowData.clientFirstName);
  await app.bookingFlowContactPage.assertFirstNameEntered(bookingFlowData.clientFirstName);
  await app.bookingFlowContactPage.clickPhoneInput();
  await app.bookingFlowContactPage.assertPhoneInputFocused();
  await app.bookingFlowContactPage.fillPhoneNumber(bookingFlowData.invalidPhoneNumber);
  await app.bookingFlowContactPage.assertPhoneNumberEntered(bookingFlowData.invalidPhoneNumber);
  await app.bookingFlowContactPage.clickInputOutside();
  await app.bookingFlowContactPage.assertInvalidPhoneNumberError();
});

test('selecting an unavailable date keeps the current date selection', async ({ app }) => {
  await app.bookingWidgetPage.open();
  await app.bookingFlowServicesPage.clickGoToServicesButton();
  await app.bookingFlowServicesPage.assertServicesAreVisible(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickSelectService(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.assertServiceSelected(bookingFlowData.serviceName);
  await app.bookingFlowServicesPage.clickServiceTimeFooter();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();
  await app.bookingFlowServicesPage.clickBackButtonFromServicesPage();
  await app.bookingWidgetPage.assertStepCardsAreVisible();

  await app.bookingFlowDateTimePage.clickGoToDateTimeButton();
  await app.bookingFlowDateTimePage.assertCalendarsAreVisible();

  const initiallySelectedDate = await app.bookingFlowDateTimePage.showsSelectedDateLabel();
  await app.bookingFlowDateTimePage.clickToSelectUnavailableDate();
  await app.bookingFlowDateTimePage.assertSelectedDateLabelExists(initiallySelectedDate);
});
