export const generateRandomNumber = (
  min: number,
  max: number,
  isRound = true,
) => {
  const randomNumber = Math.random() * (max - min) + min;
  return isRound === true ? Math.round(randomNumber) : randomNumber;
};
