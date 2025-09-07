import type { GameState } from "./types";
import { storyNodes } from "./story";
import type { Option } from "./types";

export function createGameState(): GameState {
  return { health: 6, mana: 3, inventory: [], currentNode: storyNodes[0] }; // ✅ Default mana
}

export function applyOption(state: GameState, option: Option) {
  if (option.isWrong) state.health -= 1;
  if (option.addItem) state.inventory.push(option.addItem);
  if (option.removeItem)
    state.inventory = state.inventory.filter(i => i.id !== option.removeItem);
  if (option.text.toLowerCase().includes("heal")) state.health += 2;
  return storyNodes.find(n => n.id === option.nextId) || null;
}
