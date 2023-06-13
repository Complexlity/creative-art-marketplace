
export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    //@ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateRandomNFTPrice() {
  // Define the range of possible values for NFT cost
  const minPrice = 0.01; // Minimum cost in ETH
  const maxPrice = 5; // Maximum cost in ETH
  // Generate a random value within the range
  const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
  return Number(randomPrice.toFixed(2));
}

export function generateRandomDate() {
  const sevenDays = 120 * 60 * 60 * 1000; // 5 days in milliseconds
  const randomTime = Math.floor(Math.random() * sevenDays); // Random time within the range
  return randomTime;
}

export function pickRandomItems<T>(arr: T[], numOfItems: number) {
  const result = [];
  const arrCopy = [...arr]; // make a copy of the original array to avoid modifying it

  for (let i = 0; i < numOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomIndex]); // add the randomly selected item to the result array
    arrCopy.splice(randomIndex, 1); // remove the selected item from the copy of the array
  }

  return result;
}