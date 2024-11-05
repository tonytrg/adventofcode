import { createReadStream } from "fs";
import { getRelativePath } from "../../helper";
import { join } from "path";
import { createInterface } from "readline";

async function part1() {
  const inputPath = join(getRelativePath(import.meta.url), "input");
  const fileStream = createReadStream(inputPath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  let sum = 0;
  for await (const line of rl) {
    let points = 0;
    const card = line
      .split(":")[1]
      .split("|")
      .map((s) => s.trim());
    const winners = new Map<number, unknown>();
    for (const num of card[0].match(/\d+/g)?.map(Number) ?? []) {
      winners.set(num, {});
    }
    for (const num of card[1].match(/\d+/g)?.map(Number) ?? []) {
      if (winners.has(num)) {
        if (points == 0) {
          points = 1;
        } else {
          points = points * 2;
        }
      }
    }
    sum += points;
  }
  console.log("The total sum is:", sum);
}

async function part2() {
  const inputPath = join(getRelativePath(import.meta.url), "input");
  const fileStream = createReadStream(inputPath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
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
