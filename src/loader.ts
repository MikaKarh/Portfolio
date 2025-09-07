export function createImage(path: string): HTMLImageElement {
  const img = new Image();
  img.src = path; // Vite serves /assets correctly
  return img;
}

export function loadImages(images: HTMLImageElement[]): Promise<void[]> {
  return Promise.all(
    images.map(img =>
      new Promise<void>(resolve => {
        if (img.complete) return resolve();
        img.onload = () => resolve();
        img.onerror = () => resolve();
      })
    )
  );
}
