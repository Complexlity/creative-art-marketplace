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
  const minPrice = 0.01; // Minimum cost in MKT
  const maxPrice = 5; // Maximum cost in MKT
  // Generate a random value within the range
  const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
  return Number(randomPrice.toFixed(2));
}

export function generateRandomTimeDifference() {
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

export function generateRandomDate() {
  const now = new Date().getTime(); // get the timestamp of the current date and time
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000; // subtract the number of milliseconds in 7 days to get the timestamp of 7 days ago
  const randomTimestamp =
    Math.floor(Math.random() * (now - sevenDaysAgo)) + sevenDaysAgo; // generate a random timestamp between now and 7 days ago
  const randomDate = new Date(randomTimestamp); // create a new Date object from the random timestamp

  const month = String(randomDate.getMonth() + 1).padStart(2, "0"); // get the month and pad it with a leading zero if necessary
  const day = String(randomDate.getDate()).padStart(2, "0"); // get the day and pad it with a leading zero if necessary
  const year = randomDate.getFullYear(); // get the year
  const hours = randomDate.getHours() % 12 || 12; // get the hours in 12-hour format
  const minutes = String(randomDate.getMinutes()).padStart(2, "0"); // get the minutes and pad it with a leading zero if necessary
  const ampm = randomDate.getHours() < 12 ? "AM" : "PM"; // get the AM/PM indicator

  return { raw: randomDate, formatted: `${month}/${day}/${year} ${hours}:${minutes} ${ampm}` };
}

export function getRandomNumber(n: number) {
  let number = Math.floor(Math.random() * (n + 1));
  return number.toString();
}

export function pickFromArray<T>(arr: T[]): T | undefined {
   return arr[Math.floor(Math.random() * arr.length)];
}