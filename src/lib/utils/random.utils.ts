export const randomNumberFromRange = (
  min: number,
  max: number,
  decimalPlaces: number = 0
) => {
  if (min > max) {
    throw new Error(
      'Minimum value must be less than or equal to the maximum value.'
    );
  }

  const scaleFactor = Math.pow(10, decimalPlaces);
  const randomScaled =
    Math.floor(Math.random() * (max - min + 1) * scaleFactor) +
    min * scaleFactor;

  const randomNumber = randomScaled / scaleFactor;

  return randomNumber;
};
