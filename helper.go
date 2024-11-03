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
