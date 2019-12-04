export interface Profile {
  cardNumber: number;
  firstName: string;
  lastName: string;
  uuid: string;
}

export interface MSLUserInfo {
  jwt?: string;
  userinfo: {
    IdCardNumber: string;
    FirstName: string;
    LastName: string;
    UniqueId: string;
  };
}

export type LogoutFn = () => void;
