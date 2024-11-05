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

  const map = new Map<string, number>([
    ["green", 13],
    ["blue", 14],
    ["red", 12],
  ]);
  let sum = 0;
  for await (const line of rl) {
    const game = line.split(":");
    const reveals = game[1].split(";");
    let possible = true;
    outerLoop: for (const r of reveals) {
      const colors = r.split(",");
      for (const color of colors) {
        const sep = color.trim().split(" ");
        const maxCubes = map.get(sep[1])!;
        const numCubes = parseInt(sep[0]);
        if (!isNaN(numCubes)) {
          if (maxCubes < numCubes) {
            possible = false;
            break outerLoop;
          }
        } else {
          possible = false;
          break outerLoop;
        }
      }
    }
    if (possible) {
      const id = line.match(/\d+/g)?.[0] ?? "0";
      const idAsNum = parseInt(id)
      if (!isNaN(idAsNum)) {
        sum += idAsNum
      }
    }
  }
  console.log("Sum of id of possible games: ", sum)
  rl.close();
  fileStream.close();
}

async function part2() {
  console.log("part 2");
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
