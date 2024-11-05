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

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line);
  }

  const isSymbol = (symbol: string): boolean => {
    return symbol != "." && isNaN(parseInt(symbol));
  };

  const isPartNum = (
    col: number,
    row: number,
    num: number,
    matrix: string[]
  ): boolean => {
    if (row - 1 >= 0) {
      for (
        let i = Math.max(0, col - 1);
        i < Math.min(matrix[row - 1].length, col + num.toString().length + 1);
        i++
      ) {
        if (isSymbol(matrix[row - 1][i])) {
          return true;
        }
      }
    }
    if (col - 1 >= 0) {
      if (isSymbol(matrix[row][col - 1])) {
        return true;
      }
    }
    if (col + num.toString().length < matrix[row].length) {
      if (isSymbol(matrix[row][col + num.toString().length])) {
        return true;
      }
    }
    if (row + 1 < matrix.length) {
      for (
        let i = Math.max(0, col - 1);
        i < Math.min(matrix[row + 1].length, col + num.toString().length + 1);
        i++
      ) {
        if (isSymbol(matrix[row + 1][i])) {
          return true;
        }
      }
    }
    return false;
  };

  let sum = 0;
  for (let row = 0; row < matrix.length; row++) {
    const line = matrix[row];
    for (let i = 0; i < line.length; i++) {
      let num = parseInt(line[i]);
      const col = i;
      if (!isNaN(num)) {
        for (let ii = i + 1; ii < line.length; ii++) {
          i++;
          const num_suffix = parseInt(line[ii]);
          if (!isNaN(num_suffix)) {
            num = num * 10 + num_suffix;
          } else {
            break;
          }
        }
        if (isPartNum(col, row, num, matrix)) {
          sum += num;
        }
      }
    }
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

  const matrix = [];
  for await (const line of rl) {
    matrix.push(line);
  }
  const getAdjacentNums = (
    row: number,
    col: number,
    matrix: string[]
  ): number[] => {
    const nums: number[] = [];
    if (col - 1 > 0) {
      let s = "";
      for (let i = col - 1; i >= 0; i--) {
        const parse = parseInt(matrix[row][i]);
        if (!isNaN(parse)) {
          s = matrix[row][i]+ s;
        } else {
          break;
        }
      }
      const num = parseInt(s)
      if (num > 0) {
        nums.push(num);
      }
    }
    if (col + 1 < matrix[col].length) {
      let num = 0;
      for (let i = col + 1; i < matrix[col].length; i++) {
        const parse = parseInt(matrix[row][i]);
        if (!isNaN(parse)) {
          num = num * 10 + parse;
        } else {
          break;
        }
      }
      if (num > 0) {
        nums.push(num);
      }
    }
    if (row - 1 >= 0) {
      let seek = Math.max(0, col - 1);
      while (!isNaN(parseInt(matrix[row - 1][seek]))) {
        seek--;
      }
      for (
        let i = Math.max(0, seek + 1);
        i < Math.min(col + 2, matrix[row - 1].length);
        i++
      ) {
        let num = 0;
        for (let ii = i; ii < matrix[row - 1].length; ii++) {
          i = ii;
          const n = parseInt(matrix[row - 1][ii]);
          if (!isNaN(n)) {
            num = num * 10 + n;
          } else {
            break;
          }
        }
        if (num != 0) {
          nums.push(num);
        }
      }
    }
    if (row + 1 > 0) {
      let seek = Math.max(0, col - 1);
      while (!isNaN(parseInt(matrix[row + 1][seek]))) {
        seek--;
      }
      for (
        let i = Math.max(0, seek + 1);
        i < Math.min(col + 2, matrix[row + 1].length);
        i++
      ) {
        let num = 0;
        for (let ii = i; ii < matrix[row + 1].length; ii++) {
          i = ii;
          const n = parseInt(matrix[row + 1][ii]);
          if (!isNaN(n)) {
            num = num * 10 + n;
          } else {
            break;
          }
        }
        if (num != 0) {
          nums.push(num);
        }
      }
    }
    return nums;
  };
  const calcGear = (row: number, col: number, matrix: string[]): number => {
    if (matrix[row][col] === "*") {
      const nums = getAdjacentNums(row, col, matrix);
      if (nums.length === 2) {
        return nums[0] * nums[1];
      }
    }
    return 0;
  };

  let sum = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      sum += calcGear(row, col, matrix);
    }
  }
  console.log("Sum of gear ratio:", sum);
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
