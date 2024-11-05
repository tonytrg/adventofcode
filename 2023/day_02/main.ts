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
      const idAsNum = parseInt(id);
      if (!isNaN(idAsNum)) {
        sum += idAsNum;
      }
    }
  }
  console.log("Sum of id of possible games: ", sum);
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

  const PowerOfCubes = (l: string): number => {
    let green = 1;
    let blue = 1;
    let red = 1;

    const throws = l.split(":")?.[1] ?? "";
    if (throws === "") {
      throw new Error("invalid format of line");
    }
    const seperated = throws?.split(";").map((s) =>
      s
        .split(",")
        .map((item) => item?.trim() ?? "")
        .filter((item) => item !== "")
    );

    for (const t of seperated) {
      for (const tt of t) {
        const sep = tt.split(" ");
        const count = parseInt(sep[0]);
        if (isNaN(count)) {
          throw new Error("Failed to parse number");
        }
        switch (sep[1] ?? "") {
          case "red":
            if (count > red) {
              red = count;
            }
            break;
          case "blue":
            if (count > blue) {
              blue = count;
            }
            break;
          case "green":
            if (count > green) {
              green = count;
            }
            break;
          default:
            throw new Error("color unknown");
        }
      }
    }

    return green * blue * red;
  };

  let sumPower = 0;

  for await (const line of rl) {
    sumPower += PowerOfCubes(line);
  }

  console.log("Power of sum: ", sumPower);
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
