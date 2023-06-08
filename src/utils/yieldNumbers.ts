export default function* randomNumberGenerator(max: number) {
  while (true) {
    yield Math.floor(Math.random() * max);
  }
}


