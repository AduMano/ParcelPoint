import { atom } from "recoil";

// Types
import { IMember, IUserRelationship } from "../types/types";

export const userRelationship = atom<IUserRelationship[]>({
  key: "userRelationship",
  default: []
});

export const selectedMember = atom<IMember | null>({
  key: "selectedMember",
  default: null
});

export const selectedMembers = atom<IMember[]>({
  key: "selectedMembers",
  default: []
});

export const selectAllTrigger = atom<boolean>({
  key: "selectAllTrigger",
  default: false,
})