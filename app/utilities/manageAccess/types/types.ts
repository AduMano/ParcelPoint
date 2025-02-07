interface Relationship  {
  id: string,
  name: string,
  createdAt: Date | null,
  createdBy: string | null,
  modifiedAt: Date | null,
  modifiedBy: string | null,
  userGroupMembers?: []
}

export interface IUserInformation {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix?: string | null;
  birthDate: Date | string;
  address: string;
  contactNumber: string;
  photoUrl: string;
  email: string;
  username: string;
}

export interface IMember extends IUserInformation {
  relationship?: Relationship;
  isAuthorized?: boolean;
  groupMemberId?: string;
  GroupOwnerId?: string;
}

export interface IUpdateMemberRequest {
  GroupMemberId?: string;
  RelationshipId?: string;
  IsAuthorized?: boolean;
  GroupOwnerId?: string;
}

export type IsActive = "checked" | "unchecked";

export interface IUserRelationship {
  id: string;
  name: string;
  createdAt: Date;
  createdBy: string;
  modifiedAt: Date;
  modifiedBy: string;
}

export interface IUserGroupMember {
  MemberId?: string;
  RelationshipId?: string;
  IsAuthorized?: boolean;
}

