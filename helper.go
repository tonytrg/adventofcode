package helper

import (
	"log"
	"path/filepath"
	"runtime"
)

func HandleError(err error) {
	if err != nil {
		log.Fatalf("Failed with: %s\n", err.Error())
	}
}

// input values are stored in the same path as the executables, but git ignored
func GetRelativePath() string {
	_, filename, _, ok := runtime.Caller(1)
	if !ok {
		log.Fatalf("Failed to recover path.")
	}
	return filepath.Dir(filename)
}

func IsNumber(ascii int) (number int, ok bool) {
	if ascii >= 48 && ascii <= 57 {
		number = ascii - 48
		ok = true
	}
	return number, ok
}
