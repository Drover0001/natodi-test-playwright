export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqresUserResponse {
  data: ReqresUser;
  support?: {
    url: string;
    text: string;
  };
}
