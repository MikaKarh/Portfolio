import { storyNodes } from "./story";
import type { GameState, Option } from "./types";
import { createGameState, applyOption } from "./game";
import { drawBackground, drawPortraitToCanvas } from "./ui";
import { loadImages, createImage } from "./loader";
import { startCombat, playerAttack, playerCastFireball, playerDefend, playerRunAway, enemyTurn, type CombatState } from "./combat";

const storyText = document.getElementById("story-text")!;
const optionsDiv = document.getElementById("options")!;
const healthDisplay = document.getElementById("health-display")!;
const inventoryDisplay = document.getElementById("inventory-display")!;
const backgroundCanvas = document.getElementById("background-canvas") as HTMLCanvasElement;

const bgCtx = backgroundCanvas.getContext("2d")!;

// Portrait slots (left, middle, right)
const portraitSlots = [
  {
    container: document.querySelectorAll(".portrait-slot")[0] as HTMLDivElement,
    canvas: document.getElementById("portrait-left") as HTMLCanvasElement
  },
  {
    container: document.querySelectorAll(".portrait-slot")[1] as HTMLDivElement,
    canvas: document.getElementById("portrait-middle") as HTMLCanvasElement
  },
  {
    container: document.querySelectorAll(".portrait-slot")[2] as HTMLDivElement,
    canvas: document.getElementById("portrait-right") as HTMLCanvasElement
  }
];

const spriteSheets = {
  butler: createImage("/assets/sprite sheets/CubePortraitSheet.png"),
  princess: createImage("/assets/sprite sheets/PrincessPortraitSheet.png"),
  devil: createImage("/assets/sprite sheets/DevilPortraitSheet.png"),
  goblin: createImage("/assets/sprite sheets/GoblinPortraitSheet.png"),
  succubus: createImage("/assets/sprite sheets/SuccubusPortraitSheet.png"),
  sorcerer: createImage("/assets/sprite sheets/SorcererPortraitSheet.png")
};

const backgroundImages: Record<string, HTMLImageElement> = {
  lairEntrance: createImage("/assets/backgrounds/lair_entrance.png"),
  darkTunnel: createImage("/assets/backgrounds/dark_tunnel.png"),
  ritualChamber: createImage("/assets/backgrounds/ritual_chamber.png"),
  lavaPit: createImage("/assets/backgrounds/lava_pit.png"),
  throneRoom: createImage("/assets/backgrounds/throne_room.png")
};

let state: GameState = createGameState();

let activeCombat: CombatState | null = null;

function startCombatUI(enemyName: string) {
  activeCombat = startCombat(enemyName);
  renderCombatUI();
}

function renderCombatUI() {
  if (!activeCombat) return;
  optionsDiv.innerHTML = "";

  storyText.textContent = `${activeCombat.enemyName} - HP: ${activeCombat.enemyHealth}\nYour HP: ${state.health} | Mana: ${state.mana}`;

  const actions = [
    { text: "Attack", action: () => endPlayerTurn(playerAttack(state, activeCombat!)) },
    { text: "Cast Fireball", action: () => endPlayerTurn(playerCastFireball(state, activeCombat!)) },
    { text: "Defend", action: () => endPlayerTurn(playerDefend()) },
    { text: "Run Away", action: () => { storyText.textContent = playerRunAway(); activeCombat = null; showNode(state.currentNode); } }
  ];

  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = a.action;
    optionsDiv.appendChild(btn);
  });
}

function endPlayerTurn(playerActionText: string) {
  if (!activeCombat) return;

  storyText.textContent = playerActionText;

  if (activeCombat.enemyHealth <= 0) {
    storyText.textContent += `\n✅ ${activeCombat.enemyName} is defeated!`;
    activeCombat = null;
    const nextNode = storyNodes.find(n => n.id === state.currentNode.options[0].nextId);
    if (nextNode) showNode(nextNode);
    return;
  }

  setTimeout(() => {
    const enemyText = enemyTurn(state, activeCombat!);
    storyText.textContent += `\n${enemyText}`;

    if (state.health <= 0) {
      showGameOver();
      return;
    }

    renderCombatUI();
  }, 800);
}

function updateUI() {
  healthDisplay.textContent = `❤️ Health: ${state.health}`;
  inventoryDisplay.textContent = `🎒 Inventory: ${
    state.inventory.length ? state.inventory.map(i => i.name).join(", ") : "Empty"
  }`;
}

function showNode(node = state.currentNode) {
  state.currentNode = node;
  storyText.textContent = node.text;
  optionsDiv.innerHTML = "";

  drawBackground(bgCtx, backgroundCanvas, backgroundImages[node.background]);

  const extras = node.extraCharacters || [];

  // Hide all portrait slots
  portraitSlots.forEach(slot => (slot.container.style.display = "none"));

  if (extras.length === 0) {
    // Only player → center
    const mid = portraitSlots[1];
    mid.container.style.display = "block";
    drawPortraitToCanvas(mid.canvas, spriteSheets.butler, node.portrait);
  } 
  else if (extras.length === 1) {
    // Left = other, Right = player
    const left = portraitSlots[0], right = portraitSlots[2];
    left.container.style.display = "block";
    right.container.style.display = "block";

    drawPortraitToCanvas(left.canvas, spriteSheets[extras[0].character], extras[0].portrait);
    drawPortraitToCanvas(right.canvas, spriteSheets.butler, node.portrait);
  } 
  else if (extras.length === 2) {
    // Left, Middle, Right
    const left = portraitSlots[0], mid = portraitSlots[1], right = portraitSlots[2];
    left.container.style.display = "block";
    mid.container.style.display = "block";
    right.container.style.display = "block";

    drawPortraitToCanvas(left.canvas, spriteSheets[extras[0].character], extras[0].portrait);
    drawPortraitToCanvas(mid.canvas, spriteSheets[extras[1].character], extras[1].portrait);
    drawPortraitToCanvas(right.canvas, spriteSheets.butler, node.portrait);
  }

  updateUI();
  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleOption(opt);
    optionsDiv.appendChild(btn);
  });
}

function handleOption(option: Option) {
  if (option.puzzle) {
    const answer = prompt(option.puzzle.question)?.toLowerCase().trim();
    if (answer === option.puzzle.answer.toLowerCase()) {
      alert("✅ Correct!");
    } else {
      alert("❌ Wrong answer! You lose 2 health.");
      state.health -= 2;
    }
  }

if (option.combat) {
  startCombatUI(option.combat.enemy);
  return;
}

  const next = applyOption(state, option);
  if (state.health <= 0) return showGameOver();
  if (next) showNode(next);
}

function showGameOver() {
  storyText.textContent = "💀 You have no health left. Game Over!";
  optionsDiv.innerHTML = "";

  const btn = document.createElement("button");
  btn.textContent = "Restart Game";
  btn.onclick = () => {
    state = createGameState();
    showNode(storyNodes[0]);
  };
  optionsDiv.appendChild(btn);
}

async function initGame() {
  await loadImages([...Object.values(spriteSheets), ...Object.values(backgroundImages)]);
  showNode(storyNodes[0]);
}

initGame();
