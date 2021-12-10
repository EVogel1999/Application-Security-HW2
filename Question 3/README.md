# Report

To see the report/screenshots for this question see the [REPORT.md](/REPORT.md) file.

# Running the SQL Injection Vulnerability

Question 3 is fully dockerized so you don't have to install any other dependencies to run the app besides docker.

You can install docker [docker](https://docs.docker.com/get-docker/).

Please note that the following ports must be open to run the app:
- 3000 (Server)
- 3306 (MySQL Server)
- 8080 (Adminer)
- 8081 (Client)

To run type the following command in your terminal from this directory. Note you may need to delete older images if there are issues. You may also want to run the client in an incognito window just to make sure the site isn't loading a cached site:

```
docker compose up
```

## Database

The Database is a MySQL database (installed via docker) that has one database, 'mydb', and one table, 'users'.  The database is populated with the following data when the server starts:

| username | password |
| ---  | --- |
| mock1 | password1 |
| mock2 | password2 |

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
| POST | /login | 200, 500 |

The POST /login route accepts the following request body (in JSON):
```
{
    "username": "value",
    "password": "value
}
```

Additionally, it takes an optional query parameter 'safe'.  If 'safe' is set to true, the route is not vulnerable to SQL injection; if it is false, it is vulnerable to SQL injection.  By default the value is set to false.

### Sample Request

POST /login?safe=true
```
{
    "username": "mock1",
    "password": "password1
}
```

## Client

The client is a simple VueJS app that logs the user in and displays the user returned from the route if the user logs in successfully (or exploits the SQL injection vulnerability).  The login page can be found at http://localhost:8081.

By default the SQL injection vulnerability is enabled.  To change it to safe mode simply select the radio option labeled 'No Vulnerability'.