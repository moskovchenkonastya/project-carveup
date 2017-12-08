package main

import (
	"database/sql"
	"fmt"
	"log"

	"io/ioutil"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// инициализируем базу данных
	db, err := sql.Open("sqlite3", "./tasks.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sqlStmt, err := ioutil.ReadFile("scheme.sql")
	if err == nil {
		_, err = db.Exec(string(sqlStmt))
		if err != nil {
			fmt.Printf("%q: %s\n", err, sqlStmt)
			return
		}
	}

	fmt.Print("done.\n")

}
