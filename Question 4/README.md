# Report

To see the report/screenshots for this question see the [REPORT.md](/REPORT.md) file.

# Running the SQL Injection Vulnerability

Question 4 is fully dockerized so you don't have to install any other dependencies to run the app besides docker.

You can install docker [docker](https://docs.docker.com/get-docker/).

Please note that the following ports must be open to run the app:
- 3000 (Server)
- 3306 (MySQL Server)
- 8080 (Adminer)
- 8081 (Client)
- 4200 (Forged Site)

To run type the following command in your terminal from this directory. Note you may need to delete older images if there are issues. You may also want to run the client in an incognito window just to make sure the site isn't loading a cached site:

```
docker compose up
```

If you have issues running please check that the ports are clear.  If there are still issues you might need to prune the docker system and volumes.  You can force this by running the following (**note these commands will delete ALL images, containers and volumes**):

```
docker system prune -af
docker volume prune
```

## Database

The Database is a MySQL database (installed via docker) that has one database, 'mydb', and one table, 'messages'.  The database is not populated with dummy data but it does contain the following schema:

| Key | Value |
| --- | --- |
| id | String |
| message | String |

You can access the database by going to http://localhost:8080 and filing out the following to log in (after the server has started):

| Key | Value |
| ---  | --- |
| System | MySQL |
| Server | db |
| Username | root |
| Password | password |
| Database | mydb |

## Server

The server is a small express javascript API that consumes HTTP requests.  It only has one route that accepts the following:

| Method | Route | Responses |
| --- | --- | --- |
| POST | /messages | 201, 500 |
| GET | /messages | 200, 500 |

The POST /messages route accepts the following request body (in JSON):
```
{
    "message": "value"
}
```
It creates a new message that will be displayed on the client.

The GET /messages route gets all of the messages in the database to display on the client.

### Sample Requests

POST /messages
```
{
    "message": "message",
}
```

GET /messages

## Client

The client is a simple VueJS app that displays anonymous messages on a board.  It also allows the user to write and post a message onto the board.  The page can be found at http://localhost:8081.

By default, the app is secure against XSS.

## Forged Site

This is a small HTML website that prompts the user that they have won a free iPhone X.