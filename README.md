# server

| ROUTE           | HTTP   | DESCRIPTION                    |
|-----------------|--------|--------------------------------|
| /               | GET    | Index                          |
| /users          | POST   | Add a new user to the database |
| /users/:uid     | GET    | Get a user by uid (firebase)   |
| /recipes        | GET    | Get list of recipes            |
| /favourites     | POST   | Add a new favourite            |
| /favourites/:id | GET    | Get a favourite                |
| /favourites/:id | DELETE | Delete a favourite             |  
