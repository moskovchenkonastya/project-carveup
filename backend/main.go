// https://gist.github.com/olegvg/4bb8bb5b15966aafaac3f60161f8b318

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
	"github.com/robbert229/jwt"

	"github.com/julienschmidt/httprouter"
)

const (
	ErrJson     = `{"error": "FATAL ((("}`
	ReduxTest   = `{"data": {"token": "askdjlksaj"}}`
	ErrAuthJson = `{"error": "Login failed"}`

	SecretCode = "github.com/julienschmidt/httprouter"
)

type UserRequestJSON struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Surname  string `json:"surname"`
}

type UserResponseJSON struct {
	Name string `json:"username"`
}

type LoginRequestJSON struct {
	Email    string
	Password string
}
type TokenReponseJSON struct {
	Token string `json:"token"`
}

type ContactsGetRequestJSON struct {
	Text string
	Type string
}

type ContactsPutRequestJSON struct {
	Id   int
	Text string
	Type string
}

type ContactsDeleteRequestJSON struct {
	Id int
}

type UserResponseJSON1 struct {
	Email   string
	Name    string
	Surname string
	Success bool
}

type ContactsListResponseJSONUserContact struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
	Type string `json:"type"`
}

type ContactsListResponseJSONUser struct {
	Id       int                                   `json:"id"`
	Name     string                                `json:"name"`
	Surname  string                                `json:"surname"`
	Contacts []ContactsListResponseJSONUserContact `json:"contacts"`
}

type ContactsListResponseJSON struct {
	Success bool                           `json:"success"`
	Data    []ContactsListResponseJSONUser `json:"data"`
}

type ContactsGetResponseJSON struct {
	Success  bool   `json:"success"`
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Contacts []struct {
		Id   int    `json:"id"`
		Text string `json:"text"`
		Type string `json:"type"`
	}
}

type ContactsNewResponseJSON struct {
	Id   int    `json:"id"`
	Text string `json:"text"`
	Type string `json:"type"`
}

type ContactsDeleteResponseJSON struct {
	Success bool `json:"success"`
}

type Handler struct {
	DB *sql.DB
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authToken := r.Header.Get("Authorization")

		algorithm := jwt.HmacSha256(SecretCode)

		ret, err := algorithm.Decode(authToken)

		if err != nil {
			log.Printf("Error reading body: %v", err)
			http.Error(w, "Auth didn't work", http.StatusNonAuthoritativeInfo)
			return
		} else {
			val, _ := ret.Get("Email")
			log.Printf("Auth-mail: %s", val)
		}

		next.ServeHTTP(w, r)
	})
}

func logsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		//body, err := ioutil.ReadAll(r.Body)

		log.Println(r.Method, r.URL)

		//}
		next.ServeHTTP(w, r)
	})
}

func originMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token")
		w.Header().Set("Access-Control-Expose-Headers", "Authorization")

		w.Header().Set("Content-Type", "application/json")

		next.ServeHTTP(w, r)
	})
}

/*
Endpoint: /api/users – зарегистрировать нового пользователя
Method: post

curl -v -X POST -H "Content-Type: application/json" -d '{"email":"Test@ya.ru", "password":"123", "name":"t1", "surname":"Full test 2"}' http://localhost:8080/api/users

*/
func (h *Handler) postUsers(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	// читаем json
	var err error

	defer r.Body.Close()
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		http.Error(w, "can't read body", http.StatusBadRequest)
		return
	}

	//data := []byte(body)
	req := &UserRequestJSON{}
	json.Unmarshal(data, req)

	tx, err := h.DB.Begin()
	if err != nil {
		log.Fatal(err)
	}

	dbresult, errEx := h.DB.Exec("INSERT INTO USERS (Email, Password, Name, Surname) VALUES ($1, $2, $3, $4);",
		req.Email, req.Password, req.Name, req.Surname)

	affected, err := dbresult.RowsAffected()

	log.Println("Insert - RowsAffected", affected, req.Email, req.Name, req.Surname)

	if errEx != nil {
		tx.Rollback()
		log.Fatal(errEx)
	} else {
		tx.Commit()
	}

	res := &UserResponseJSON{}
	res.Name = req.Name

	result, errMar := json.Marshal(res)

	if errMar == nil {
		w.Write([]byte(result))
	} else {
		w.Write([]byte(ErrJson))
	}

}

func (h *Handler) getUser(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	// читаем json
	w.Write([]byte("{\"username\": \"Mark\"}"))
}

/*
Endpoint: /api/login – получить токен для пользователя
Method: post

curl -v -X POST -H "Content-Type: application/json" -d '{"email":"Test@ya.ru", "password":"123"}' http://localhost:8080/api/login

*/
func (h *Handler) postLogin(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	// читаем json
	var err error

	// читаем тело
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		http.Error(w, "can't read body", http.StatusBadRequest)
		return
	}

	data := []byte(body)
	req := &LoginRequestJSON{}
	json.Unmarshal(data, req)

	row := h.DB.QueryRow("SELECT Email FROM USERS WHERE Email=? AND Password=?", req.Email, req.Password)

	res := &TokenReponseJSON{}

	var email string

	err = row.Scan(&email)

	if err == nil {

		algorithm := jwt.HmacSha256(SecretCode)

		claims := jwt.NewClaim()
		claims.Set("Email", email)

		var errToken error
		res.Token, errToken = algorithm.Encode(claims)
		if errToken != nil {
			log.Fatal(errToken)
		}

		result, errMar := json.Marshal(res)

		if errMar != nil {
			log.Fatal(errMar)
		}

		w.Write([]byte(result))
		log.Println("Logon - Success", email)

	} else {
		log.Println("Logon - Failed", err)
		w.Write([]byte(ReduxTest))

	}

	//if ret == nil {
	//	http.Error(w, "login failed", http.StatusBadRequest)
	//	return
	//}

}

/*
Endpoint: /api/contacts_list – зарегистрировать нового пользователя
Method: get

curl -v -X GET -H "Content-Type: application/json" -H "Authorization: eyJUeXAiOiJKV1QiLCJBbGciOiJIUzI1NiIsIkN0eSI6IiJ9.eyJFbWFpbCI6IlRlc3RAeWEucnUiLCJpYXQiOjE1MTA2OTc3NDB9.OUNUWmZnTFJZb3JsN2o4ZENxX2JhQTNqOGdfd3BmVVhzT1ZJeHV2WS1zUQ"  http://localhost:5050/api/contacts_list

*/
func (h *Handler) getContactsList(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	rows, err := h.DB.Query(
		"SELECT " +
			"a.Id as UserID" +
			",a.Name as Name" +
			",a.Surname as Surname" +
			",b.Id as ContactID" +
			",b.Text as Text" +
			",b.Type as Type" +
			" FROM Users as a" +
			" INNER JOIN CONTACTS as b" +
			" ON a.ID = b.USER_ID")

	if err != nil {
		log.Fatal(err)
	}

	resJSON := &ContactsListResponseJSON{}
	resJSON.Success = true
	prevID := -1

	var user = &ContactsListResponseJSONUser{}
	for rows.Next() {

		var UserID, ContactID int
		var Name, Surname, Text, Type string

		if err := rows.Scan(&UserID, &Name, &Surname, &ContactID, &Text, &Type); err != nil {
			log.Fatal(err)
		}

		contact := &ContactsListResponseJSONUserContact{}

		contact.Id = ContactID
		contact.Text = Text
		contact.Type = Type

		if prevID != UserID {

			user = &ContactsListResponseJSONUser{}
			resJSON.Data = append(resJSON.Data, *user)
			user.Id = UserID
			user.Name = Name
			user.Surname = Surname

			user.Contacts = append(user.Contacts, *contact)

			prevID = UserID
		} else {
			user.Contacts = append(user.Contacts, *contact)

		}

	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

	result, errMar := json.Marshal(resJSON)

	if errMar != nil {
		log.Fatal(errMar)
	}

	w.Write([]byte(result))
	log.Println("GET - contacts list")

}

/*
Endpoint: /api/contacts – получить полный список контактов для текущего пользователя

Method: get

curl -v -X GET -H "Content-Type: application/json" -H "Authorization: eyJUeXAiOiJKV1QiLCJBbGciOiJIUzI1NiIsIkN0eSI6IiJ9.eyJFbWFpbCI6IlRlc3RAeWEucnUiLCJpYXQiOjE1MTA2OTc3NDB9.OUNUWmZnTFJZb3JsN2o4ZENxX2JhQTNqOGdfd3BmVVhzT1ZJeHV2WS1zUQ"  -d '{}' http://localhost:8080/api/contacts
*/
func (h *Handler) getContacts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	rows, err := h.DB.Query(
		"SELECT" +
			"a.Id as UserID," +
			",a.Name as Name" +
			",a.Surname as Surname" +
			",b.Id as ContactID" +
			",b.Text as Text" +
			",b.Type as Type" +
			"FROM Users as a" +
			"LEFT JOIN CONTACTS as b" +
			"ON a.ID = b.USER_ID" +
			"WHERE a.Email = d@mail.ru")

	if err != nil {
		log.Fatal(err)
	}

	resJson := ContactsGetResponseJSON{}
	resJson.Success = true
	prevId := -1

	var ContactCounter int

	for rows.Next() {

		var UserID, ContactID int
		var Name, Surname, Text, Type string

		if err := rows.Scan(&UserID, &Name, &Surname, &ContactID, &Text, &Type); err != nil {
			log.Fatal(err)
		}

		if prevId != UserID {
			resJson.Id = UserID
			resJson.Name = Name
			resJson.Surname = Surname

			prevId = UserID
		}

		resJson.Contacts = append(resJson.Contacts)
		resJson.Contacts[ContactCounter].Id = ContactID
		resJson.Contacts[ContactCounter].Text = Text
		resJson.Contacts[ContactCounter].Type = Type

		ContactCounter++

	}

	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

	result, errMar := json.Marshal(resJson)

	if errMar != nil {
		log.Fatal(errMar)
	}

	w.Write([]byte(result))
	log.Println("GET - contact list")

}

func (h *Handler) postContacts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//	fmt.Fprintln(w, `<a href="/">site index</a>`)

}

func (h *Handler) putContacts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//	fmt.Fprintln(w, `<a href="/">site index</a>`)

}

func (h *Handler) deleteContacts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//	fmt.Fprintln(w, `<a href="/">site index</a>`)

}

/*
Endpoint: /api/contacts_list – зарегистрировать нового пользователя
Method: post

curl -v -X GET -H "Content-Type: application/json" -d '{}' http://localhost:8080//api/users

*/
func (h *Handler) getSearch(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//	fmt.Fprintln(w, `<a href="/">site index</a>`)

}

func main() {

	db, err := sql.Open("sqlite3", "./db/tasks.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	handler := &Handler{DB: db}

	contactslist := httprouter.New()

	contactslist.GET("/api/contacts_list", handler.getContactsList)

	contacts := httprouter.New()

	contacts.GET("/api/contacts", handler.getContacts)
	contacts.POST("/api/contacts", handler.postContacts)
	contacts.DELETE("/api/contacts", handler.deleteContacts)
	contacts.PUT("/api/contacts", handler.putContacts)

	search := httprouter.New()
	search.GET("/api/search", handler.getSearch)

	users := httprouter.New()
	users.POST("/api/users", handler.postUsers)
	users.OPTIONS("/api/users", handler.postUsers)

	user := httprouter.New()
	user.GET("/api/user", handler.getUser)

	login := httprouter.New()
	login.POST("/api/login", handler.postLogin)

	contactsMiddleware := AuthMiddleware(contacts)
	contactslistMiddleware := AuthMiddleware(contactslist)
	searchMiddleware := AuthMiddleware(search)
	userMiddleware := AuthMiddleware(user)

	siteMux := http.NewServeMux()
	siteMux.Handle("/api/contacts_list", contactslistMiddleware)
	siteMux.Handle("/api/contacts", contactsMiddleware)
	siteMux.Handle("/api/search", searchMiddleware)
	siteMux.Handle("/api/users", users)
	siteMux.Handle("/api/user", userMiddleware)
	siteMux.Handle("/api/login", login)

	originMux := originMiddleware(siteMux)
	logsMux := logsMiddleware(originMux)

	fmt.Println("starting server at :5050")
	log.Fatal(http.ListenAndServe(":5050", logsMux))
}
