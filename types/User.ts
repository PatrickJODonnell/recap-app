export interface User {
  birthDate: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  plan: string;
  signUpDate: string;
  interests: string[];
  uid: string;
}