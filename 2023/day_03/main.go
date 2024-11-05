package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"strconv"

	. "github.com/tonytrg/adventofcode"
)

func main() {
	// Part 1
	file, err := os.Open(filepath.Join(GetRelativePath(), "input"))
	HandleError(err)
	scanner := bufio.NewScanner(file)
	matrix := [][]rune{}
	for scanner.Scan() {
		line := scanner.Text()
		matrix = append(matrix, []rune(line))
	}
	sum := 0
	for row_idx, row := range matrix {
		for i := 0; i < len(row); i++ {
			col_idx := i
			r, ok := IsNumber(int(row[i]))
			if !ok {
				continue
			}
			number := r
			for ii := i + 1; ii < len(row); ii++ {
				rr, ok := IsNumber(int(row[ii]))
				if !ok {
					break
				}
				number = number*10 + rr
				i++
			}
			if IsPartNumber(row_idx, col_idx, number, matrix) {
				fmt.Print(number, true)
				sum += number
			}
		}
		fmt.Println()
	}
	fmt.Println(sum)
}

func IsPartNumber(row, col int, number int, matrix [][]rune) bool {
	if col - 1 >= 0 {
		if IsSymbol(matrix[row][col-1]) {
			//fmt.Println("left")
			return true
		}
	}
	digits := len(strconv.Itoa(number))
	if (col + digits) < len(matrix[row]) {
		if IsSymbol(matrix[row][col + digits]) {
			//fmt.Println("right")
			return true
		}
	}
	if row - 1 >= 0 {
		row_p := row - 1
		col_p := int(math.Max(float64(0), float64(col - 1)))
		col_max := int(math.Min(float64(len(matrix[row_p])), float64(col + digits + 1)))
		for idx := col_p; idx < col_max; idx++ {
			if IsSymbol(matrix[row_p][idx]) {
				//fmt.Println("top")
				return true
			}
		}
	}
	if row + 1 < len(matrix) {
		row_a := row + 1
		col_p := int(math.Max(float64(0), float64(col - 1)))
		col_max := int(math.Min(float64(len(matrix[row_a])), float64(col + digits + 1)))
		for idx := col_p; idx < col_max; idx++ {
			if IsSymbol(matrix[row_a][idx]) {
				//fmt.Println("bottom")
				return true
			}
		}
	}
	fmt.Print(number, false)
	return false
}

func IsSymbol(r rune) bool {
	if _, ok := IsNumber(int(r)); ok {
		return false
	}
	if int(r) == 46 {
		return false
	}
	return true
}
