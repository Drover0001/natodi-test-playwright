import { RequestHolder } from './requestHolder';
import { ReqresController } from './reqres.controller';

export class API extends RequestHolder {
  public readonly users = new ReqresController(this.request);
}
