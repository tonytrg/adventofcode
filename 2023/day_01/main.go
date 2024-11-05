package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	. "github.com/tonytrg/adventofcode"
)

func main() {
	// Part 1
	file, err := os.Open(filepath.Join(GetRelativePath(), "input"))
	HandleError(err)
	sum := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		calibration := scanner.Text()
		numbers := []int{}
		for i := 0; i < len(calibration); i++ {
			n, ok := IsNumber(int(calibration[i]))
			if ok {
				numbers = append(numbers, n)
			}
		}
		if len(numbers) == 0 {
			log.Fatal("Calibration without numbers...")
		}
		first_digit := numbers[0]
		second_digit := numbers[len(numbers)-1]
		sum = sum + (first_digit*10 + second_digit)
	}
	fmt.Printf("The sum of values is: %d\n", sum)

	// Part 2
	file.Seek(0, 0)
	sum = 0
	scanner = bufio.NewScanner(file)
	numbersAsString := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	for scanner.Scan() {
		calibration := scanner.Text()
		values := make(map[int]int)
		for i, n := range numbersAsString {
			m := GetNumbers(calibration, n, i+1)
			for k, v := range m {
				values[k] = v
			}
		}
		for i := 0; i < len(calibration); i++ {
			n, ok := IsNumber(int(calibration[i]))
			if ok {
				values[i] = n
			}
		}
		if len(values) == 0 {
			log.Fatal("Calibration without numbers...")
		}
		var min, max int
		init := true
		for k := range values {
			if init {
				init = false
				min, max = k, k
			}
			if k > max {
				max = k
			}
			if k < min {
				min = k
			}
		}
		sum = sum + (values[min]*10 + values[max])
	}
	fmt.Printf("The new sum of values is: %d\n", sum)
}

func GetNumbers(calibration, number string, num int) map[int]int {
	m := make(map[int]int)
	i := 0
	for i < len(calibration) {
		index := strings.Index(calibration[i:], number)
		if index != -1 {
			m[index+i] = num
		}
		i = i + index + len(number)
	}
	return m
}
