export type PortraitExpression =
  | "default" | "happy" | "pleased" | "worried" | "blushed"
  | "scared" | "angry" | "pleading" | "surprised" | "thinking"
  | "focused" | "lecherous" | "sweating" | "meek" | "blank";

export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface Option {
  text: string;
  nextId: number;
  isWrong?: boolean;
  setPortrait?: PortraitExpression;
  addItem?: Item;
  removeItem?: string;
  combat?: { enemy: string; difficulty: number };
  puzzle?: { question: string; answer: string };
}

export interface StoryNode {
  id: number;
  text: string;
  portrait: PortraitExpression;
  character?: "butler" | "princess" | "devil" | "goblin" | "succubus" | "sorcerer";
  background: string;
  options: Option[];
  extraCharacters?: { character: "princess" | "devil" | "goblin" | "succubus" | "sorcerer"; portrait: PortraitExpression }[];
}

export interface GameState {
  health: number;
  mana: number;              
  inventory: Item[];
  currentNode: StoryNode;
}