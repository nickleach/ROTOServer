## Role of the Observer's Server

> Server for my band's website.

* No current deployment

Routes in the User Registration section are authenticated
by Username/Password unless otherwise mentioned.

Routes elsewhere in the app are authenticated by passing
an 'Access-Token' header along with the request.

### User Registration & Auth

#### Creating a User

**Route:** `POST admin/users`

**Params:**

| Parameter |  Type  |
| --------- |  ----  |
|  Password | String |
|  Name     | String |
|  Username | String |

Note that usernames must be unique

Example success (Code 201 - Created):

```json
{
  "message": "User Created!"
}
```
Example Failure (Code 422 - Unprocessable Entity):

```json
{
  "message": "A user with that username already exists."
}
```

#### Logging In with an Existing User

**Route:** `POST admin/users/login`

**Params:**

| Parameter | Type   |
| --------- | ------ |
| Username  | String |
| Password  | String |

Example Success (Code 200 - OK) - Same as Created JSON

Example Failure (Code 401 - Unauthorized)

```json
{
  "message": "Authentication failed. Wrong password."
}
```
Or

```json
{
  "message": "Authentication failed. User not found."
}
```
### Band Members


### Shows
