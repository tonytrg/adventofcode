import { createReadStream } from "fs";
import { createInterface } from "readline";
import { getRelativePath } from "../../helper";
import { join } from "path";

async function part1() {
  const inputPath = join(getRelativePath(import.meta.url), "input");
  const fileStream = createReadStream(inputPath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    const numbers = line.match(/\d/g)?.map(Number) ?? [];
    if (numbers.length === 0) {
      throw new Error(`No digits found in line: ${line}`);
    }
    const num = numbers[0] * 10 + numbers[numbers.length - 1];
    sum += num;
  }
  console.log(`Sum of digits: ${sum}`);
  rl.close();
  fileStream.close();
}

async function part2() {
  const inputPath = join(getRelativePath(import.meta.url), "input");
  const fileStream = createReadStream(inputPath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    const map = new Map<number, number>();
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const num = parseInt(char);
      if (!isNaN(num)) {
        map.set(i, num);
      }
    }
    const numbers = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    for (let i = 0; i < numbers.length; i++) {
      for (let ii = 0; ii < line.length; ii++) {
        const subString = line.substring(ii);
        if (subString.startsWith(numbers[i])) {
            map.set(ii, i + 1)
            ii += numbers[i].length
        }
      }
    }
    const min = Math.min(...map.keys())
    const max = Math.max(...map.keys())
    sum += map.get(min)! * 10 + map.get(max)!
  }
  console.log(`Sum of revised digits: ${sum}`);
  rl.close();
  fileStream.close();
}

async function main() {
  try {
    await part1();
    await part2();
  } catch (err) {
    console.log("Error: ", err);
    process.exit(1);
  }
}

main();
