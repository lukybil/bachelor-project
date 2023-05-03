import { randomInt } from 'crypto';
import fs from 'fs/promises';

const ROW_COUNT = 1_000_000;

const difficulties = ['veryEasy', 'easy', 'medium', 'hard', 'veryHard'];

const randomGaussian = (min: number, max: number, skew: number = 1) => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randomGaussian(min, max, skew); // resample between 0 and 1 if out of range
  else {
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
  }
  return num;
};

const firstNames = ['Luke', 'Anakin', 'Ashoka', 'Yoda', 'Finn', 'Obi-Wan'];
const lastNames = ['Smith', 'Skywalker', 'Sith', 'Jedi'];

(async () => {
  await fs.writeFile('./data/leaderBoardsData.json', '[');
  for (let j = 0; j < 10; j++) {
    const arr = new Array(ROW_COUNT / 10);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = {
        difficulty: difficulties[randomInt(difficulties.length)],
        completionTime: randomGaussian(150, 3000),
        username: `user${randomInt(100_000, 999_999)}`,
        firstName: firstNames[randomInt(firstNames.length)],
        lastName: lastNames[randomInt(lastNames.length)],
        email: 'fake@fake.fale',
        profileImage: '',
      };
    }
    console.log(`generated ${arr.length * (j + 1)} values`);
    await fs.appendFile(`./data/leaderBoardsData.json`, JSON.stringify(arr).slice(1, -1) + (j !== 9 ? ',' : ''));
  }
  await fs.appendFile('./data/leaderBoardsData.json', ']');
})();
