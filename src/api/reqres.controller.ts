import { RequestHolder } from './requestHolder';
import type { ReqresUserResponse } from './models';
import { env } from '../../env';
import { step } from '../../reporters/steps';

export class ReqresController extends RequestHolder {
  @step()
  async getUser(id: number): Promise<ReqresUserResponse> {
    const response = await this.request.get(`${env.REQRES_BASE_URL}/users/${id}`);
    return response.json() as Promise<ReqresUserResponse>;
  }
}
