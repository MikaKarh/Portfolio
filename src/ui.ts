import type { PortraitExpression } from "./types";

export const portraitMap: Record<PortraitExpression, { col: number; row: number }> = {
  default:   { col: 0, row: 0 },
  happy:     { col: 1, row: 0 },
  pleased:   { col: 2, row: 0 },
  worried:   { col: 3, row: 0 },
  blushed:   { col: 4, row: 0 },

  scared:    { col: 0, row: 1 },
  angry:     { col: 1, row: 1 },
  pleading:  { col: 2, row: 1 },
  surprised: { col: 3, row: 1 },
  thinking:  { col: 4, row: 1 },

  focused:   { col: 0, row: 2 },
  lecherous: { col: 1, row: 2 },
  sweating:  { col: 2, row: 2 },
  meek:      { col: 3, row: 2 },
  blank:     { col: 4, row: 2 }
};

function getCanvasSize(canvas: HTMLCanvasElement) {
  const style = getComputedStyle(canvas);
  canvas.width = parseInt(style.width);
  canvas.height = parseInt(style.height);
}

export function drawPortraitToCanvas(
  canvas: HTMLCanvasElement,
  sheet: HTMLImageElement,
  expression: PortraitExpression
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !sheet) return;

  getCanvasSize(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Single-frame sprite (like goblin/devil/succubus)
  if (sheet.width <= 128 || sheet.height <= 128) {
    ctx.drawImage(sheet, 0, 0, canvas.width, canvas.height);
    return;
  }

  const FRAME_COLS = 5;
  const FRAME_ROWS = 3;
  const BUFFER = 5;

  const frameWidth = sheet.width / FRAME_COLS;
  const frameHeight = sheet.height / FRAME_ROWS;
  const pos = portraitMap[expression];

  const spriteWidth = frameWidth - 2 * BUFFER;
  const spriteHeight =
    pos.row === FRAME_ROWS - 1 ? frameHeight - BUFFER : frameHeight - 2 * BUFFER;

  ctx.drawImage(
    sheet,
    pos.col * frameWidth + BUFFER,
    pos.row * frameHeight + BUFFER,
    spriteWidth,
    spriteHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img?: HTMLImageElement
) {
  if (!img) return;

  const style = getComputedStyle(canvas);
  canvas.width = parseInt(style.width);
  canvas.height = parseInt(style.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const imgAspect = img.width / img.height;
  const canvasAspect = canvas.width / canvas.height;

  let drawWidth, drawHeight;

if (canvasAspect > imgAspect) {
  // Scale by height
  drawHeight = canvas.height;
  drawWidth = canvas.height * imgAspect;
} else {
  // Scale by width
  drawWidth = canvas.width;
  drawHeight = canvas.width / imgAspect;
}

  const offsetX = (canvas.width - drawWidth) / 2;
  const offsetY = (canvas.height - drawHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
