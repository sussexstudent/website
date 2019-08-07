export interface Profile {
  cardNumber: number;
  firstName: string;
  lastName: string;
  uuid: string;
}

export type LogoutFn = () => void;
