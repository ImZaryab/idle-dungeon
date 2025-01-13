import { Moment } from "moment";

export enum CharacterStatus {
  IDLE = "IDLE",
  INQUEST = "INQUEST",
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
