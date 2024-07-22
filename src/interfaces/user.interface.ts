export interface IUser {
  id: number;
  walletAddress: string;
  email?: string;
  username: string;
}

export interface ICreateUserPayload extends IUser {
  signature: string;
}