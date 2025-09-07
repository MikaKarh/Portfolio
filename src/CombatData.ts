export interface NPCStats {
  name: string;
  health: number;
  attack: number;
  defense: number;
}

export const enemies: Record<string, NPCStats> = {
  "Imp Guard": { name: "Imp Guard", health: 8, attack: 3, defense: 1 },
  "Devil Sorcerer": { name: "Devil Sorcerer", health: 12, attack: 4, defense: 2 },
  "Succubus": { name: "Succubus", health: 10, attack: 3, defense: 1 },
  "Devil Lord": { name: "Devil Lord", health: 20, attack: 5, defense: 3 }
};
