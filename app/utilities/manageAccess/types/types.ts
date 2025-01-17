type Relationship =
  | "Friend"
  | "Father"
  | "Mother"
  | "Cousin"
  | "Sister"
  | "Brother"
  | "Aunt"
  | "Uncle"
  | "Nephew";

type AuthorizationStatus = "Authorized" | "Not Authorized";

export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  relationship: Relationship;
  isAuthorized: AuthorizationStatus;
  username: string;
}

export type IsActive = "checked" | "unchecked";
