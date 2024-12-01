import { ItemRarity, QuestItem, Rarity } from "../types";

// Define the quest items available
const questItems: QuestItem[] = [
  {
    name: "Common Sword",
    description: "A basic sword.",
    value: 10,
    rarity: ItemRarity.common,
  },
  {
    name: "Uncommon Shield",
    description: "A sturdy shield.",
    value: 30,
    rarity: ItemRarity.uncommon,
  },
  {
    name: "Rare Bow",
    description: "A rare bow with magical properties.",
    value: 100,
    rarity: ItemRarity.rare,
  },
  {
    name: "Epic Armor",
    description: "Legendary armor that boosts defense.",
    value: 500,
    rarity: ItemRarity.elite,
  },
  {
    name: "Legendary Ring",
    description: "A ring of immense power.",
    value: 1000,
    rarity: ItemRarity.legendary,
  },
  {
    name: "Mythical Sword",
    description: "A sword with unparalleled power.",
    value: 5000,
    rarity: ItemRarity.divine,
  },
];

// Define the drop rates for each rarity (in percentage)
const dropRates: Record<Rarity, number> = {
  common: 50, // 50% chance
  uncommon: 30, // 30% chance
  rare: 15, // 15% chance
  elite: 4, // 4% chance
  legendary: 0.9, // 0.9% chance
  divine: 0.1, // 0.1% chance
};

// Function to get a random item based on drop rates and rarity
function getRandomItem(
  questItems: QuestItem[],
  dropRates: Record<Rarity, number>
): QuestItem {
  const randomRoll = Math.random() * 100; // Generate a random number between 0 and 100

  // Determine the rarity of the item based on the drop rates
  let cumulativeChance = 0;
  let selectedRarity: Rarity | null = null;

  // Loop through the rarities and find the corresponding rarity based on drop rates
  for (const rarity of [...Object.values(ItemRarity)] as Rarity[]) {
    cumulativeChance += dropRates[rarity];
    if (randomRoll <= cumulativeChance) {
      selectedRarity = rarity;
      break;
    }
  }

  // Filter the quest items based on the selected rarity
  if (selectedRarity) {
    const filteredItems = questItems.filter(
      (item) => item.rarity === selectedRarity
    );

    // Select a random item from the filtered items
    const randomItem =
      filteredItems[Math.floor(Math.random() * filteredItems.length)];

    return randomItem;
  }

  // Default return if no rarity matches (should never happen)
  return questItems[0]; // fallback to first item
}

// Example of a quest completion and rewarding an item
export function getQuestReward() {
  const rewardedItem = getRandomItem(questItems, dropRates);
  console.log(`Quest completed! You received: ${JSON.stringify(rewardedItem)}`);
}
