export const handleImgError = (e: { currentTarget: { src: string } }, img: string): void => {
  e.currentTarget.src = img;
};
