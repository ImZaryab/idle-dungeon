import { Moment } from "moment";

export type TCharacter = {
  status: "idle" | "in-quest" | "recovering";
  questStartTime: Moment | null;
  questCompletionTime: Moment | null;
  remainingTime: string;
  img: string;
  claimReward: boolean;
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
