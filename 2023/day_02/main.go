package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	. "github.com/tonytrg/adventofcode"
)

func main() {
	// Part 1
	totalCubes := make(map[string]int)
	totalCubes["red"] = 12
	totalCubes["green"] = 13
	totalCubes["blue"] = 14

	file, err := os.Open(filepath.Join(GetRelativePath(), "input"))
	HandleError(err)
	scanner := bufio.NewScanner(file)
	sum := 0
	for scanner.Scan() {
		game := scanner.Text()
		split := strings.Split(game, ":")
		if len(split) != 2 {
			log.Fatal("incorrect format")
		}
		id, err := strconv.Atoi(split[0][5:])
		HandleError(err)
		reveals := strings.Split(split[1], ";")
		if len(reveals) == 0 {
			log.Fatal("incorrect format of reveals")
		}
		possible := true
	checkGame:
		for _, reveal := range reveals {
			cubes := strings.Split(reveal, ",")
			for _, color := range cubes {
				c := strings.Split(strings.Trim(color, " "), " ")
				if len(c) != 2 {
					log.Fatalf("could not split count and color for: _%s_, length: %d", color, len(c))
				}
				count, err := strconv.Atoi(c[0])
				HandleError(err)
				totalCount, ok := totalCubes[c[1]]
				if !ok {
					log.Fatal("Unidentified color")
				}
				if count > totalCount {
					possible = false
					break checkGame
				}
			}
		}
		if possible {
			sum = sum + id
		}
	}
	fmt.Printf("Sum of id of possible games: %d\n", sum)

	// Part 2
	file.Seek(0, 0)
	sum = 0
	scanner = bufio.NewScanner(file)
	for scanner.Scan() {
		game := scanner.Text()
		reveals := strings.Split(game, ":")
		if len(reveals) != 2 {
			log.Fatal("incorrect format of game")
		}
		reveals = strings.Split(reveals[1], ";")
		blue, green, red := 1, 1, 1
		for _, reveal := range(reveals) {
			c := strings.Split(reveal, ",")
			for _, color := range(c) {
				cubes := strings.Split(strings.Trim(color, " "), " ")
				if len(cubes) != 2 {
					fmt.Println(cubes)
					log.Fatal("invalid format cubes")
				}
				count, err := strconv.Atoi(cubes[0])
				HandleError(err)
				switch cubes[1] {
				case "blue":
					if count > blue {
						blue = count
					}
				case "red":
					if count > red {
						red = count
					}
				case "green":
					if count > green {
						green = count
					}
				default:
					log.Fatal("invalid color")
				}
			}
		}
		sum = sum + (red * blue * green)
	}
	fmt.Printf("Sum of id of power of games: %d\n", sum)
}
