import { Moment } from "moment";

export enum CharacterStatus {
  IDLE = "IDLE",
  INQUEST = "INQUEST",
  QUESTCOMPLETED = "QUESTCOMPLETED",
  RECOVERING = "RECOVERING",
}

export type TCharacter = {
  status: CharacterStatus;
  questStartTime: Moment | null;
  questCompletionTime: Moment | null;
  remainingTime: string;
  img: string;
  claimReward: boolean;
};

export type Character = {
  id: number;
  name: string;
  img: string;
  hp: number;
  mana: number;
  energy: number;
  status: string;
};

//Define Quest Item Type
export interface QuestItem {
  name: string;
  description: string;
  value: number; // in-game currency coins
  rarity: Rarity;
}

// Define the rarities for quest items
export enum ItemRarity {
  common = "common",
  uncommon = "uncommon",
  rare = "rare",
  elite = "elite",
  legendary = "legendary",
  divine = "divine",
}

export type Rarity = ItemRarity;

export enum Locations {
  WOODLANDS = "WOODLANDS",
}

export type TVerifyUserResponse = {
  message: string;
  completed: boolean;
  data: {
    name: string;
    isNewUser: boolean;
  };
};

export type Quest = {
  id: number;
  questCompleted: boolean;
};

export interface IMapLocation {
  id: number;
  name: string;
  position: {
    top: string;
    left: string;
  };
  isDisabled: boolean;
  locationDetails: string;
}

export type LocationQuest = {
  locationId: number;
  id: number;
  title: string;
  description: string;
  completionTime: number;
  currencyReward: number;
  expReward: number;
  energyCost: number;
  isRepeatable: boolean;
  minLevelRequirement: number;
  minReputationRequirement: number;
}

export type userDataReq = {
  id?: string;
  name?: string;
  email?: string;
  provider?: string;
  isVerified?: boolean;
}
