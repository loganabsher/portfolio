[![Coverage Status](https://coveralls.io/repos/github/loganabsher/portfolio/badge.svg?branch=master)](https://coveralls.io/github/loganabsher/portfolio?branch=master)

# **backend api guide**
### **Note** I am using httpie to make all backend calls, you can find a download [HERE](https://httpie.org/)
### **Note** for any routes using Bearer authentication you **Must** login and use the token returned in the response




### User Routes:

<details><summary>signup</summary>
<p>

## POST: /api/signup
#### http POST localhost:8000/api/signup email=absherlogan@gmail.com password=123

```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 21:24:45 GMT
ETag: W/"cf-zHJZW8CrkkR+fHx3jp1iQj6TxHs"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AzADKCfLNhO-ndz1yaCvXtBf0uzNHe9L5.SF1cvSwon0nO5NhfBhYR568teflWOUO4eEqCeFuL32Y; Path=/; HttpOnly

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjdhYzc0OTAzYzJkMTkxMTZjODQ3YzliNmVlYzczYzA5MzMyYjFmM2RhMTcyNjMzNWUzNzkxOTg0NjZjMTY1MzciLCJpYXQiOjE1NDgyNzg2ODV9.yKJstZNCP5idUxkYygQ-6wRTFCdHZHryLR2tlFY4LeU"
```

</p>
</details>

<details><summary>login</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 21:25:43 GMT
ETag: W/"cf-hwH0CG5S7WXAxvGCKnLB+4Pjqi0"
Vary: Origin
X-Powered-By: Express
set-cookie: portfolio-login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNiZjEwMThkOWVmZGJmZjRjZjAwOWNhZmEwYTliYTRhNGI4ZTBkYjI3MjJiYjhhYjQ1MjU2ZDcwNDYyODBhMDMiLCJpYXQiOjE1NDgyNzg3NDN9.weZpRu0kgwRRGfrq86dDUCwxMQuUSERIkmiKf_Rvk_w; Max-Age=900000; Path=/; Expires=Sun, 03 Feb 2019 07:25:43 GMT
set-cookie: connect.sid=s%3A4hBOz0yJwdIlYmUqMCKa-JI6oEohBFIa.jN0WAvAmfdojcXf6CKa7LWt5R7YziV%2BjSwlan1DuljU; Path=/; HttpOnly

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImNiZjEwMThkOWVmZGJmZjRjZjAwOWNhZmEwYTliYTRhNGI4ZTBkYjI3MjJiYjhhYjQ1MjU2ZDcwNDYyODBhMDMiLCJpYXQiOjE1NDgyNzg3NDN9.weZpRu0kgwRRGfrq86dDUCwxMQuUSERIkmiKf_Rvk_w"
```

</p>
</details>

<details><summary>changepassword</summary>
<p>

## PUT: /api/updatepassword
#### http -a absherlogan@gmail.com:123 PUT localhost:8000/api/updatepassword password=321

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 21:49:12 GMT
ETag: W/"cf-8x7WtNhta+irvKiG0Dpt6V0XmYs"
Vary: Origin
X-Powered-By: Express
set-cookie: portfolio-login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRiMzUwZDdkMWVhZDc1ZDJjYzZkZmUzMTY4ZTg4ZWNmNjFkNmUyOTA3NzIxMjRlNzI2OGU3YWQ2NDRlZWI3ZDkiLCJpYXQiOjE1NDgyODAxNTJ9.i1Y5J_2KN5TdQs-4esLBFc0WPV8TzW64HQGZh98wIlQ; Max-Age=900000; Path=/; Expires=Sun, 03 Feb 2019 07:49:12 GMT
set-cookie: connect.sid=s%3A9vuZO6hQAIV9btaPTJCsc5r9nf8SNV2j.CpWAXYgWthZEjkHYpmlPgzNjMbmPGb18bYa8MwHq5bg; Path=/; HttpOnly

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImRiMzUwZDdkMWVhZDc1ZDJjYzZkZmUzMTY4ZTg4ZWNmNjFkNmUyOTA3NzIxMjRlNzI2OGU3YWQ2NDRlZWI3ZDkiLCJpYXQiOjE1NDgyODAxNTJ9.i1Y5J_2KN5TdQs-4esLBFc0WPV8TzW64HQGZh98wIlQ"
```

</p>
</details>

<details><summary>deleteaccount</summary>
<p>

## DELETE: /api/deleteaccount
#### http -a absherlogan@gmail.com:321 DELETE localhost:8000/api/deleteaccount

```
HTTP/1.1 204 No Content
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Date: Wed, 23 Jan 2019 21:51:11 GMT
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AbKzKlmAwdbV5ixo0kC9AaJIl_sQUJosi.HzZisDQrFu4PYWaIgIs61DHQDULZUaMTW9JicHvAJro; Path=/; HttpOnly
```

</p>
</details>




### Repository Routes:

<details><summary>repositories/all</summary>
<p>


## GET: /api/repositories/all
#### http GET localhost:8000/api/repositories/all

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 12061
Content-Type: application/json; charset=utf-8
Date: Mon, 08 Oct 2018 19:26:06 GMT
ETag: W/"2f1d-n9F5YEC0WhchowFM9Aj5N9BCCRo"
X-Powered-By: Express

[
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d06c",
        "created_at": "2017-09-23T18:42:06Z",
        "name": "rapidcncmanufactoring",
        "size": 270,
        "updated_at": "2018-10-02T18:39:50Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d06f",
        "created_at": "2018-05-26T18:21:02Z",
        "name": "my-javascript-algorithms",
        "size": 4,
        "updated_at": "2018-06-16T01:52:22Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d073",
        "created_at": "2018-07-29T02:01:50Z",
        "name": "moch-facebook",
        "size": 24,
        "updated_at": "2018-08-10T05:27:17Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d070",
        "created_at": "2017-12-03T23:08:53Z",
        "name": "random-things",
        "size": 1,
        "updated_at": "2017-12-03T23:08:53Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d078",
        "created_at": "2017-08-08T16:03:12Z",
        "name": "seattle-javascript-401d17",
        "size": 2698,
        "updated_at": "2017-08-08T16:03:15Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d072",
        "created_at": "2017-02-14T19:21:28Z",
        "name": "Grade-Fellows",
        "size": 217,
        "updated_at": "2017-05-10T21:23:43Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d079",
        "created_at": "2017-03-21T23:24:44Z",
        "name": "06-ajax-and-json",
        "size": 425,
        "updated_at": "2017-03-21T23:24:46Z"
    }
]
```

</p>
</details>


<details><summary>repository/:id</summary>
<p>

## GET: /api/repositories/:id
#### http GET localhost:8000/api/repository/5bbbae83841a2339b3f2d06f/

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 157
Content-Type: application/json; charset=utf-8
Date: Mon, 08 Oct 2018 19:51:39 GMT
ETag: W/"9d-gUc4kOig3LBk4+LdQxFBG6CfziY"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbbae83841a2339b3f2d06f",
    "created_at": "2018-05-26T18:21:02Z",
    "name": "my-javascript-algorithms",
    "size": 4,
    "updated_at": "2018-06-16T01:52:22Z"
}
```

</p>
</details>




### **NOTICE:** For all routes that require bearer auth, you must use your most recent login token that is returned when you either login, signup, or change your password. This token can be found at the bottom of each response as seen below.


<details><summary>bearer auth demo</summary>
<p>

## POST: /api/signup
#### http POST localhost:8000/api/signup email=absherlogan@gmail.com password=123

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 21:57:55 GMT
ETag: W/"cf-m3YwKzkae91TPncP+uxxEnsq6Wk"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AwIv1d_n79aF_BWaJTors-ZzNcav-2z-1.mOI6XHa9d1oRrjYq5GL%2FdaEa6q8uAUnxL6%2Fi%2BkiMJmc; Path=/; HttpOnly

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0"
```

#### this is the bearer token:
```
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0
```

</p>
</details>




### Profile Routes:


<details><summary>new profile</summary>
<p>

## POST: /api/profile
#### http POST localhost:8000/api/profile Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0' firstName=Logan lastName=Absher userName=Gatsby

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 94
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 22:04:06 GMT
ETag: W/"5e-wLGhDu/kG/3qOiAwlHof3iaaUTQ"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AntFcJw5U9u8qtkGd18B4Vc4L0augM96d.IX%2BSR%2FWVI9eosnTH1jqXVmRM385ZdcyRytiX5NgUf7g; Path=/; HttpOnly

{
    "_id": "5c48e4d626fc716036544b15",
    "firstName": "Logan",
    "lastName": "Absher",
    "userName": "Gatsby"
}
```

</p>
</details>


<details><summary>get profile</summary>
<p>

## GET: /api/profile/self
#### http GET localhost:8000/api/profile/self Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0'

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 102
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 22:06:10 GMT
ETag: W/"66-DiIvMlLA/mVNET4M4cb8ep/shWE"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3ASnKb2sKG8uOKCGKp47P7HgyZ0465WJYl.tBU5cvnfImaWiqnrqOKCZrW8fL2rcGycQMwdyKfS%2B2E; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5c48e4d626fc716036544b15",
    "firstName": "Logan",
    "lastName": "Absher",
    "userName": "Gatsby"
}
```

</p>
</details>


<details><summary>edit profile</summary>
<p>

## PUT: /api/profile/edit
#### http PUT localhost:8000/api/profile/edit Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0' firstName="new first name" lastName="new last name" userName="new user name"

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 116
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Jan 2019 22:08:08 GMT
ETag: W/"74-lsb7xc7nQ7CFROKWJ12RkclkySU"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AY5HWp7umKy0UNluzkAyYtfRY_HxeY8J9.mkfVc%2FG92fX3%2B1WTOuFPYIwJYq%2B8nvWq07HnWu39cIs; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5c48e4d626fc716036544b15",
    "firstName": "new first name",
    "lastName": "new last name",
    "userName": "new user name"
}
```

</p>
</details>


<details><summary>delete profile</summary>
<p>

## DELETE: /api/profile/delete
#### http DELETE localhost:8000/api/profile/delete Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA0MWU2M2ZlZWZlN2E5YWUyNGMxYjU0MWMyMWMzNWVlMjMxNWVmNDlkNGY2NGE1ZjAwNmIzNzI1OWNlMGIwZjkiLCJpYXQiOjE1NDgyODA2NzV9.cXJFgqRfBGM3tuQSCptXmavfISSlL-7cVvy8uZIe8O0'

```
HTTP/1.1 204 No Content
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Date: Wed, 23 Jan 2019 22:13:53 GMT
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3Aspu9GTebNU_E-AtRwwGlGXa0pex7q5ht.F5CU5UP4PMdCJoxnk5mxInBcYUOG%2F1zQ3yPckQvB7cg; Path=/; HttpOnly
```

</p>
</details>




### Message Routes:

<details><summary>new post</summary>
<p>

## POST: /api/message
#### http POST localhost:8000/api/message Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o' authorId=5bbd104f61fdf30d00163d77 text='cool things' title='new post' photos=link

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 283
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:30:46 GMT
ETag: W/"11b-dW1F96BA+HA/NFTLGyYrcNR1FiU"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AKQpFGSIYL_GIkN9OyKBlOqF-mfrFKYVq.v76FTtcyn71U873lJp%2B0i8RHsySGQJRsywW8oC7I%2BEI; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5cd0997694bfc381a2b14daf",
    "authorId": "5cd094190ad085799425feb0",
    "created_at": "2019-05-06T20:30:46.785Z",
    "inactive": {
        "delete_at": null,
        "delete_by": null
    },
    "next": [],
    "photos": ['link'],
    "text": "cool things",
    "title": "new post",
    "updated_at": "2019-05-06T20:30:46.785Z"
}
```

</p>
</details>


<details><summary>all messages</summary>
<p>

## GET: /api/message/fetch/:all
#### http GET localhost:8000/api/message/fetch Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o' all==true

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 2006
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:42:01 GMT
ETag: W/"7d6-5UPzaOu2XwDe5bVddAJ6ol/iI9U"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3ApTXKlPVsRGU4NwEc1K05spm5xNCXjMu-.hEljJEzhGAXy%2FgJckDQnLuNALp%2B4%2Brfg3tiQ3GRqp3k; Path=/; HttpOnly

[
    {
        "__v": 0,
        "_id": "5cd0993463689a80668f5f3a",
        "authorId": "5cd094190ad085799425feb0",
        "created_at": "2019-05-06T20:29:40.501Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "new post who dis?",
        "title": "new post",
        "updated_at": "2019-05-06T20:29:40.501Z"
    },
    {
        "__v": 0,
        "_id": "5cd0997694bfc381a2b14daf",
        "authorId": "5cd094190ad085799425feb0",
        "created_at": "2019-05-06T20:30:46.785Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "cool things",
        "title": "new post",
        "updated_at": "2019-05-06T20:30:46.785Z"
    },
    {
        "__v": 0,
        "_id": "5cd09af494bfc381a2b14db0",
        "authorId": "5cd094190ad085799425feb0",
        "created_at": "2019-05-06T20:37:08.513Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "other post",
        "title": "other post my dawg",
        "updated_at": "2019-05-06T20:37:08.513Z"
    },
    {
        "__v": 0,
        "_id": "5cd09af694bfc381a2b14db1",
        "authorId": "5cd094190ad085799425feb0",
        "created_at": "2019-05-06T20:37:10.246Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "other post",
        "title": "other post my dawg",
        "updated_at": "2019-05-06T20:37:10.246Z"
    },
    {
        "__v": 0,
        "_id": "5cd09af794bfc381a2b14db2",
        "authorId": "5cd094190ad085799425feb0",
        "created_at": "2019-05-06T20:37:11.687Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "other post",
        "title": "other post my dawg",
        "updated_at": "2019-05-06T20:37:11.687Z"
    },
    {
        "__v": 0,
        "_id": "5cd09c1294bfc381a2b14db4",
        "authorId": "5cd09bea94bfc381a2b14db3",
        "created_at": "2019-05-06T20:41:54.218Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "just for testing/context",
        "title": "some post made by another user",
        "updated_at": "2019-05-06T20:41:54.218Z"
    },
    {
        "__v": 0,
        "_id": "5cd09c1494bfc381a2b14db5",
        "authorId": "5cd09bea94bfc381a2b14db3",
        "created_at": "2019-05-06T20:41:56.132Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "just for testing/context",
        "title": "some post made by another user",
        "updated_at": "2019-05-06T20:41:56.132Z"
    }
]
```

</p>
</details>


<details><summary>your messages</summary>
<p>

## GET: /api/message/fetch/:me
#### http GET localhost:8000/api/message/fetch Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s' me==true

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 607
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:43:47 GMT
ETag: W/"25f-6fb9iNoPLLlBKdKFX3Vvug/twoI"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AaJ9p5kKYRlP2F9-E4fhc3GonmRXzAY_L.9TnJV44t%2FKfet0WFyDYb5WnUYF%2BvNaf4AOcDQ%2Ba7eq0; Path=/; HttpOnly

[
    {
        "__v": 0,
        "_id": "5cd09c1294bfc381a2b14db4",
        "authorId": "5cd09bea94bfc381a2b14db3",
        "created_at": "2019-05-06T20:41:54.218Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "just for testing/context",
        "title": "some post made by another user",
        "updated_at": "2019-05-06T20:41:54.218Z"
    },
    {
        "__v": 0,
        "_id": "5cd09c1494bfc381a2b14db5",
        "authorId": "5cd09bea94bfc381a2b14db3",
        "created_at": "2019-05-06T20:41:56.132Z",
        "inactive": {
            "delete": false,
            "delete_by": null
        },
        "next": [],
        "photos": [],
        "text": "just for testing/context",
        "title": "some post made by another user",
        "updated_at": "2019-05-06T20:41:56.132Z"
    }
]
```

</p>
</details>


<details><summary>get single message</summary>
<p>

## GET: /api/message/fetch/:itemId
#### http GET localhost:8000/api/message/fetch Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s' itemId==5cd09c1494bfc381a2b14db5'

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 319
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:48:39 GMT
ETag: W/"13f-9CyiOGSNhzOu4MnvBc/5I6m/wjI"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AZ0uutQ3qYdOB1m78dR5Cjlt2xMJK0M8n.80VK10bhHXJJHCy%2FZkkO9Mmai4jO6kFxclUz5pPr0vk; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5cd09c1494bfc381a2b14db5",
    "authorId": "5cd09bea94bfc381a2b14db3",
    "created_at": "2019-05-06T20:41:56.132Z",
    "inactive": {
        "delete": false,
        "delete_at": null,
        "delete_by": null
    },
    "next": [],
    "photos": [],
    "text": "just for testing/context",
    "title": "some post made by another user",
    "updated_at": "2019-05-06T20:41:56.132Z"
}
```

</p>
</details>


<details><summary>edit message</summary>
<p>

## PUT: /api/message/edit/:id
#### http PUT localhost:8000/api/message/edit/5cd09c1494bfc381a2b14db5 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s' text="some new text just to change things up a bit" title="cool new title"

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 124
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Nov 2018 00:42:31 GMT
ETag: W/"7c-ZgGbuDFjyKfYOSmOwF9bBJbqxZ4"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AezfYTsARBrgFipeeVwfFvGXRI44diYvg.4USM2gTj%2FwwZLIqlYbf35g4pYU8RZyygOyMryrHXmOs; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5bedfa379e0abbc5e99c7ba6",
    "authorId": "5bbd104f61fdf30d00163d77",
    "comments": "[]",
    "photos": "[new link, some other link]",
    "text": "coolest thang",
    "title": "newest post"
}
```

</p>
</details>


<details><summary>remove message</summary>
<p>

## DELETE: /api/message/remove/:id
#### http DELETE localhost:8000/api/message/remove/5cd09c1294bfc381a2b14db4 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s'

```
HTTP/1.1 204 No Content
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Date: Mon, 06 May 2019 20:54:03 GMT
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3Ap-xSYfJBUjH_8fH37DIHFvDto5uwQADD.MGXhGmF7OmPSNAYg4IyfJv%2BPNM0CRCVeet4xNZ%2FIBTo; Path=/; HttpOnly
```

</p>
</details>




### Comment Routes:


<details><summary>add comment</summary>
<p>

## POST: /api/comment
#### http POST localhost:8000/api/comment Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s' text="I like your post" prev=5cd09c1494bfc381a2b14db5

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 277
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:59:06 GMT
ETag: W/"115-GpD7QlDCn8yArfslpslshTyTCQs"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3ANQeK7YcKZkFRESU135ITxXzuW5CyNMdU.hm1zh%2B%2FQN3Wmit7ZcmoxyrfMXbWRuv3ekg7GzIzQYjY; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5cd0a01900f98f84e97355cd",
    "authorId": "5cd09bea94bfc381a2b14db3",
    "created_at": "2019-05-06T20:59:05.876Z",
    "inactive": {
        "delete_at": null,
        "delete_by": null
    },
    "next": [],
    "prev": "5cd09c1494bfc381a2b14db5",
    "text": "I like your post",
    "updated_at": "2019-05-06T20:59:05.876Z"
}
```

</p>
</details>


<details><summary>add comment</summary>
<p>

## POST: /api/comment
#### http POST localhost:8000/api/comment Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijg4ZmUzYjQ0OTYzOGZjYTIwOGQwYzliZjRjNzA3YTY4OWRmYjA2YzRlZjYzZDlkMmMxNmZmN2M4M2RjMTU0ZjMiLCJpYXQiOjE1NTcxNzUyNzR9.gNBvvY62iVWZfUMdf1kTa3OUiICqJWxGiYBgKhTIl-s' text="I like your post" prev=5cd09c1494bfc381a2b14db5

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 277
Content-Type: application/json; charset=utf-8
Date: Mon, 06 May 2019 20:59:06 GMT
ETag: W/"115-GpD7QlDCn8yArfslpslshTyTCQs"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3ANQeK7YcKZkFRESU135ITxXzuW5CyNMdU.hm1zh%2B%2FQN3Wmit7ZcmoxyrfMXbWRuv3ekg7GzIzQYjY; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5cd0a01900f98f84e97355cd",
    "authorId": "5cd09bea94bfc381a2b14db3",
    "created_at": "2019-05-06T20:59:05.876Z",
    "inactive": {
        "delete_at": null,
        "delete_by": null
    },
    "next": [],
    "prev": "5cd09c1494bfc381a2b14db5",
    "text": "I like your post",
    "updated_at": "2019-05-06T20:59:05.876Z"
}
```

</p>
</details>
