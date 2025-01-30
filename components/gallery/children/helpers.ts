export const getSizes = (
  windowWidth: number,
  windowHeight: number,
  originalWidth: number,
  originalHeight: number,
) => {
  const imageRatio = originalWidth / originalHeight;
  const windowRatio = windowWidth / windowHeight;

  let width, height;

  if (originalWidth >= windowWidth && originalHeight >= windowHeight) {
    width = originalWidth;
    height = originalHeight;
  } else {
    if (imageRatio > windowRatio) {
      height = windowHeight;
      width = (originalWidth * windowHeight) / originalHeight;
    } else if (imageRatio < windowRatio) {
      height = (originalHeight * windowWidth) / originalWidth;
      width = windowWidth;
    } else {
      height = originalHeight;
      width = originalWidth;
    }
  }
  return { width, height };
};
