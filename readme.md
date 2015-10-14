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


