import type { GameState } from "./types";
import { enemies } from "./CombatData";

export interface CombatState {
  enemyName: string;
  enemyHealth: number;
}

export function startCombat(enemyName: string): CombatState {
  const enemy = enemies[enemyName];
  return { enemyName, enemyHealth: enemy.health };
}

export function playerAttack(state: GameState, combat: CombatState): string {
  const enemy = enemies[combat.enemyName];
  const damage = Math.max(1, 2 + Math.floor(Math.random() * 3) - enemy.defense);
  combat.enemyHealth -= damage;
  return `You attack and deal ${damage} damage!`;
}

export function playerCastFireball(state: GameState, combat: CombatState): string {
  if (state.mana <= 0) return "❌ Not enough mana!";
  state.mana -= 1;
  const damage = 5 + Math.floor(Math.random() * 3);
  combat.enemyHealth -= damage;
  return `🔥 You cast Fireball for ${damage} damage!`;
}

export function playerDefend(): string {
  return "🛡 You defend and take reduced damage next turn!";
}

export function playerRunAway(): string {
  return "🏃 You flee from combat!";
}

export function enemyTurn(state: GameState, combat: CombatState): string {
  const enemy = enemies[combat.enemyName];
  const damage = Math.max(1, enemy.attack - 1); // Could add logic for defense
  state.health -= damage;
  return `${enemy.name} attacks you for ${damage} damage!`;
}