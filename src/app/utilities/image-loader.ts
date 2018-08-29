export class ImageLoader {
  load(src: string): Promise<boolean> {
    return new Promise((res, rej) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        res(true);
      };
      image.onerror = () => {
        rej(false);
      };
    });
  }
}
