package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	portNumber := os.Getenv("NODE_PORT")
	http.Handle("/", http.FileServer(http.Dir("./www")))
	fmt.Println("Listening at Port Number " + portNumber)
	http.ListenAndServe(":"+portNumber, nil)
}
