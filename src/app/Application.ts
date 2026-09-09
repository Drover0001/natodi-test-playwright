import { BookingWidgetPage } from './page/BookingWidgetPage';
import { BookingFlowServicesPage } from './page/BookingFlowServicesPage';
import { BookingFlowDateTimePage } from './page/BookingFlowDateTimePage';
import { BookingFlowMasterPage } from './page/BookingFlowMasterPage';
import { BookingFlowContactPage } from './page/BookingFlowContactPage';
import { BookingFlowConfirmationPage } from './page/BookingFlowConfirmationPage';
import { PageHolder } from './abstractions/abstractClasses';
import { API } from '../api';
import { BookingFlowHelper } from '../utils/BookingFlowHelper';

export class Application extends PageHolder {
  public api = new API(this.page.request);

  public bookingWidgetPage = new BookingWidgetPage(this.page);
  public bookingFlowServicesPage = new BookingFlowServicesPage(this.page);
  public bookingFlowDateTimePage = new BookingFlowDateTimePage(this.page);
  public bookingFlowMasterPage = new BookingFlowMasterPage(this.page);
  public bookingFlowContactPage = new BookingFlowContactPage(this.page);
  public bookingFlowConfirmationPage = new BookingFlowConfirmationPage(this.page);

  public bookingFlowHelper = new BookingFlowHelper(this.bookingFlowDateTimePage, this.bookingFlowMasterPage);

}
