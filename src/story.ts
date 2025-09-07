import type { StoryNode } from "./types";

export const storyNodes: StoryNode[] = [
  {
    id: 1,
    text: "As a half-demon butler, you stand at the entrance to the infernal lair of devils. Your mistress, Princess Alina, is held captive within. The air reeks of sulfur.",
    portrait: "worried",
    character: "butler",
    background: "lairEntrance",
    options: [
      { text: "Sneak through the shadowed archway", nextId: 2 },
      { text: "Charge in boldly, dagger drawn", nextId: 3, combat: { enemy: "Imp Guard", difficulty: 0.6 } }
    ]
  },
  {
    id: 2,
    text: "You slip into a dark tunnel, avoiding patrolling imps. You find a rusted key on the ground.",
    portrait: "thinking",
    character: "butler",
    background: "darkTunnel",
    options: [
      { text: "Pick up the key", nextId: 4, addItem: { id: "rustedKey", name: "Rusted Key", description: "An old key, possibly for a cell." } },
      { text: "Ignore the key and move deeper", nextId: 5 }
    ]
  },
  {
    id: 3,
    text: "Your bold charge alerts an imp guard! The imp snarls and attacks.",
    portrait: "surprised",
    character: "butler",
    background: "lairEntrance",
    extraCharacters: [
    { character: "goblin", portrait: "angry" },
],
    options: [
      { text: "Fight the imp", nextId: 18, combat: { enemy: "Imp Guard", difficulty: 0 } },
      { text: "Run away!", nextId: 1 }
    ]
  },
  {
    id: 4,
    text: "With the rusted key in hand, you approach a fork in the tunnel. Strange chants echo from the left.",
    portrait: "focused",
    character: "butler",
    background: "darkTunnel",
    options: [
      { text: "Follow the chants to a ritual chamber", nextId: 6 },
      { text: "Take the quiet right path", nextId: 7 },
      { text: "Investigate a soft, alluring voice", nextId: 30 }
    ]
  },
  {
    id: 5,
    text: "A devil sorcerer blocks your way, fire swirling in his hands.",
    portrait: "scared",
    character: "butler",
    background: "lavaPit",
  extraCharacters: [
    { character: "sorcerer", portrait: "angry" },
],
    options: [
      { text: "Approach cautiously", nextId: 21 }
  ]
  },
  {
  id: 6,
  text: "You enter a ritual chamber. A cloaked devil is chanting over a glowing sigil. Princess Alina is chained nearby!",
  portrait: "focused",
  character: "butler",
  background: "ritualChamber",
  extraCharacters: [
    { character: "goblin", portrait: "angry" },
    { character: "princess", portrait: "sweating" }
  ],
  options: [
    { text: "Use the rusted key to free Alina", nextId: 10, removeItem: "rustedKey" },
    { text: "Attack the cloaked devil", nextId: 11, combat: { enemy: "Cloaked Devil", difficulty: 0.7 } },
    { text: "Steal a ritual dagger from the altar", nextId: 12, addItem: { id: "ritualDagger", name: "Ritual Dagger", description: "A blade imbued with dark magic." } }
  ]
  },
  {
    id: 7,
    text: "The right path leads to a locked gate. A note reads: 'Offer a sacrifice to pass.'",
    portrait: "thinking",
    character: "butler",
    background: "darkTunnel",
    options: [
      { text: "Offer a drop of your blood", nextId: 13, isWrong: true },
      { text: "Turn back to the fork", nextId: 4 }
    ]
  },
  {
    id: 8,
    text: "The sorcerer’s flames burn you, but you prevail. You find a healing potion.",
    portrait: "sweating",
    character: "butler",
    background: "lavaPit",
    options: [
      { text: "Drink the potion (heal 2)", nextId: 14, addItem: { id: "healingPotion", name: "Healing Potion", description: "Restores 2 health." } },
      { text: "Move toward the throne room", nextId: 15 }
    ]
  },
  {
    id: 9,
    text: "You hide, but the sorcerer senses you and hurls a fireball. You escape, injured.",
    portrait: "scared",
    character: "butler",
    background: "lavaPit",
    options: [
      { text: "Stagger to the throne room", nextId: 15 }
    ]
  },
  {
    id: 10,
    text: "The key unlocks Alina’s chains. She embraces you. 'Thank you! We must escape!'",
    portrait: "meek",
    character: "butler",
    background: "ritualChamber",
    extraCharacters: [
    { character: "princess", portrait: "happy" }
  ],
    options: [
      { text: "Flee together toward the exit", nextId: 16 },
      { text: "Search for weapons before leaving", nextId: 17, addItem: { id: "infernalSword", name: "Infernal Sword", description: "A blade that boosts combat strength." } }
    ]
  },
  {
    id: 11,
    text: "The devil falls, but Alina is still chained. The sigil pulses ominously.",
    portrait: "angry",
    character: "butler",
    background: "ritualChamber",
    options: [
      { text: "Free Alina with the key", nextId: 10, removeItem: "rustedKey" },
      { text: "Flee alone", nextId: 15, isWrong: true }
    ]
  },
  {
    id: 12,
    text: "You grab the ritual dagger. The sigil flares, and an imp bursts in!",
    portrait: "scared",
    character: "butler",
    background: "ritualChamber",
    options: [
      { text: "Fight the imp", nextId: 18, combat: { enemy: "Imp Guard", difficulty: 0.65 } },
      { text: "Retreat to the fork", nextId: 4 }
    ]
  },
  {
    id: 13,
    text: "Your blood opens the gate but weakens you. You lose 2 health.",
    portrait: "sweating",
    character: "butler",
    background: "darkTunnel",
    options: [
      { text: "Step through to the throne room", nextId: 15 }
    ]
  },
  {
    id: 14,
    text: "The potion restores your strength. The throne room lies ahead.",
    portrait: "happy",
    character: "butler",
    background: "lavaPit",
    options: [
      { text: "Proceed to the throne room", nextId: 15 }
    ]
  },
  {
  id: 15,
  text: "The devil lord rises from his throne. Princess Alina stands behind him in chains!",
  portrait: "angry",
  character: "butler",
  background: "throneRoom",
  extraCharacters: [
    { character: "devil", portrait: "angry" },
    { character: "princess", portrait: "pleading" }
  ],
  options: [
    { text: "Answer the riddle", nextId: 22, puzzle: { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "echo" } },
    { text: "Attack recklessly", nextId: 19, isWrong: true }
  ]
  },
  {
    id: 16,
    text: "You and Alina escape the lair, emerging into moonlight. YOU WIN! 🎉",
    portrait: "happy",
    character: "princess",
    background: "lairEntrance",
    extraCharacters: [
    { character: "princess", portrait: "default" }
  ],
    options: [
      { text: "Play Again", nextId: 1 }
    ]
  },
  {
    id: 17,
    text: "You find an infernal sword, but an imp attacks before you can free Alina.",
    portrait: "angry",
    character: "butler",
    background: "ritualChamber",
    options: [
      { text: "Fight the imp", nextId: 18, combat: { enemy: "Imp Guard", difficulty: 0.65 } },
      { text: "Free Alina quickly", nextId: 10, removeItem: "rustedKey" }
    ]
  },
  {
    id: 18,
    text: "The imp falls. You stand in the ritual chamber, catching your breath.",
    portrait: "sweating",
    character: "butler",
    background: "ritualChamber",
    options: [
      { text: "Free Alina with the key", nextId: 10, removeItem: "rustedKey" },
      { text: "Move to the throne room", nextId: 15 }
    ]
  },
  {
    id: 19,
    text: "The devil lord proves too strong. 'Pathetic!' he mocks as you fall.",
    portrait: "scared",
    character: "butler",
    background: "throneRoom",
    options: [
      { text: "Restart Game", nextId: 1 }
    ]
  },
  {
    id: 20,
    text: "You find a secret passage, but it collapses behind you. You are trapped. Game Over!",
    portrait: "scared",
    character: "butler",
    background: "throneRoom",
    options: [
      { text: "Restart Game", nextId: 1 }
    ]
  },
  {
  id: 21,
  text: "The sorcerer snarls: 'Answer my riddle or burn!'",
  portrait: "focused",
  character: "butler",
  background: "lavaPit",
  extraCharacters: [
  { character: "sorcerer", portrait: "pleased" }
  ],
  options: [
    {
      text: "Try to answer",
      nextId: 8,
      puzzle: { question: "I am always hungry, I must always be fed. The finger I touch will soon turn red. What am I?", answer: "fire" }
    },
    { text: "Attack him outright", nextId: 8, combat: { enemy: "Devil Sorcerer", difficulty: 0.8 } }
  ]
  },
  {
    id: 22,
    text: "You answer correctly! The devil lord howls in pain as the throne crumbles.",
    portrait: "scared",
    character: "devil",
    background: "throneRoom",
    options: [{ text: "Escape with Alina", nextId: 16 }]
  },
  {
  id: 30,
  text: "A beautiful succubus appears, smiling seductively. 'Stay with me, handsome butler... I can make you forget your mission.'",
  portrait: "worried",
  character: "butler",
  background: "darkTunnel",
  extraCharacters: [
    { character: "succubus", portrait: "pleased" }
  ],
  options: [
    { text: "Succumb to her charms", nextId: 31, isWrong: true },
    { text: "Refuse and prepare to fight", nextId: 32 }
  ]
},
{
  id: 31,
  text: "She embraces you, draining your strength. You lose 3 health as she laughs cruelly.",
  portrait: "lecherous",
  character: "succubus",
  background: "darkTunnel",
  options: [
    { text: "Push her away and continue", nextId: 4 }
  ]
},
{
  id: 32,
  text: "Her smile fades. 'Foolish mortal, then you shall die!'",
  portrait: "angry",
  character: "succubus",
  background: "darkTunnel",
  options: [
    { text: "Fight the succubus", nextId: 33, combat: { enemy: "Succubus", difficulty: 0.75 } }
  ]
},
{
  id: 33,
  text: "You stand over the fallen succubus. Her body dissolves into smoke.",
  portrait: "focused",
  character: "butler",
  background: "darkTunnel",
  options: [
    { text: "Move on to the fork", nextId: 4 }
  ]
}
];
