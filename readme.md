## Role of the Observer's Server

> Server for my band's website.

* No current deployment

Routes in the User Registration section are authenticated
by Username/Password unless otherwise mentioned.

Routes elsewhere in the app other than GET requests are authenticated by passing
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

Example Success (Code 200 - OK)

```json
{
  "success": true,
  "message": "Enjoy your token!",
  "token"  : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibmF0ZSIsInVzZXJuYW1lIjoibmF0ZSIsImlhdCI6MTQ0NDg1MTcxNSwiZXhwIjoxNDQ0OTM4MTE1fQ.9kOJEZb_f7HZ8RgmqbPwhDXALx2TDR1fH5lzPtlGzcA"
}
```

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
###Getting a Single User

**Route:** `GET admin/users/:user_id`

##Editing an Existing User

**Route:** `PUT admin/users/:user_id`

**Params:**

| Parameter |  Type  |
| --------- |  ----  |
|  Password | String |
|  Name     | String |
|  Username | String |

Example Success (Code 200 -OK):

```json
{
  "message" : "User updated"
}
```

##Deleting an Existing User

**Route:** `DELETE admin/users/:user_id`

**Params:** None.

Example Success (Code 200 -OK):

```json
{
  "message" : "Succesfully Deleted"
}
```


### Band Members

### Getting All Members

**Route** `GET api/members`

#### Creating a Member

**Route:** `POST api/members`

**Params:**

| Parameter    |  Type  |
| ---------    |  ----  |
|  Name        | String |
|  Description | String |
|  Instrument  | String |
|  Image       | String |


Note that names must be unique

Example success (Code 201 - Created):

```json
{
  "message": "Member Created!"
}
```
Example Failure (Code 422 - Unprocessable Entity):

```json
{
  "message": "A member with that name already exists."
}
```
###Getting a Single Member

**Route:** `GET api/members/:member_id`

##Editing an Existing Member

**Route:** `PUT api/members/:member_id`

**Params:** Same as creation

Example Success (Code 200 -OK):

```json
{
  "message" : "Member updated"
}
```

##Deleting an Existing Member

**Route:** `DELETE api/members/:member_id`

**Params:** None.

Example Success (Code 200 -OK):

```json
{
  "message" : "Succesfully Deleted"
}
```

### Shows

### Getting All Shows

**Route** `GET api/members`

#### Creating a Member

**Route:** `POST api/members`

**Params:**

| Parameter      |  Type    |
| ---------      |  ----    |
|  Title         | String   |
|  *Description* | String   |
|  Location      | String   |
|  Date          | DateTime |
|  Upcoming      | Boolean  |
|  Venue         | String   |


Note that names must be unique

Example success (Code 201 - Created):

```json
{
  "message": "Member Created!"
}
```
Example Failure (Code 422 - Unprocessable Entity):

```json
{
  "message": "A member with that name already exists."
}
```
###Getting a Single Member

**Route:** `GET api/members/:member_id`

##Editing an Existing Member

**Route:** `PUT api/members/:member_id`

**Params:** Same as creation

Example Success (Code 200 -OK):

```json
{
  "message" : "Member updated"
}
```

##Deleting an Existing Member

**Route:** `DELETE api/members/:member_id`

**Params:** None.

Example Success (Code 200 -OK):

```json
{
  "message" : "Succesfully Deleted"
}
```
