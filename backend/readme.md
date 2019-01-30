[![Coverage Status](https://coveralls.io/repos/github/loganabsher/portfolio/badge.svg?branch=master)](https://coveralls.io/github/loganabsher/portfolio?branch=master)

# **backend api guide**
### **Note** I am using httpie to make all backend calls, you can find a download here: // NOTE: add link
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

## PUT: /api/changepassword
#### http -a absherlogan@gmail.com:123 PUT localhost:8000/api/changepassword password=321

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

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## POST: /api/message
#### http POST localhost:8000/api/message Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o' authorId=5bbd104f61fdf30d00163d77 text='cool thangs' title='new post' photos=link

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 125
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Nov 2018 00:01:10 GMT
ETag: W/"7d-SwbyAM8EnPTmPyeDVja/VQkB040"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AM7XiWPIaayr7qIOAi8HUsfnDcwzmrwpQ.ip5j2k3GlVlPFkMIDyKSW0IFTprOmoi2%2Btp8uaI3F0M; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5bee08c69e0abbc5e99c7ba7",
    "authorId": "5bbd104f61fdf30d00163d77",
    "comments": "[]",
    "photos": "link",
    "text": "cool thangs",
    "title": "new post"
}
```

</p>
</details>


<details><summary>all messages</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## GET: /api/message/all
#### http GET localhost:8000/api/message/all Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkMzc5ZjYyYzk2Nzk5N2VhNWJiMjY2NGE0YjFiZDRkMjllZDQyNGQzYWM3YjlhZWNlNGNjNDMwN2M4ZjA5MWQiLCJpYXQiOjE1NDIzMjIyODZ9.3NA07bXGVjU1B81YpsD9tM4ekVhxvbZNUAUjr4bjlMo'

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 253
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Nov 2018 00:05:06 GMT
ETag: W/"fd-CJ/XsUPKmwGJBNEXdiFwFyGs8Mw"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AdmXN71WPKtmE3BNwlwQ1rw8LMpmSzqtF.ZjF4a9gJndmAWYv77sy3RA7ZqjKTPsp%2B9kjJX4UOr4c; Path=/; HttpOnly

[
    {
        "__v": 0,
        "_id": "5bedfa379e0abbc5e99c7ba6",
        "authorId": "5bbd104f61fdf30d00163d77",
        "comments": "[]",
        "photos": "link",
        "text": "cool thangs",
        "title": "new post"
    },
    {
        "__v": 0,
        "_id": "5bee08c69e0abbc5e99c7ba7",
        "authorId": "5bbd104f61fdf30d00163d77",
        "comments": "[]",
        "photos": "another link",
        "text": "cooler thangs",
        "title": "newer post"
    }
]
```

</p>
</details>


<details><summary>your messages</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## GET: /api/message/self/:id
#### http GET localhost:8000/api/message/self/5bbd104f61fdf30d00163d77 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkMzc5ZjYyYzk2Nzk5N2VhNWJiMjY2NGE0YjFiZDRkMjllZDQyNGQzYWM3YjlhZWNlNGNjNDMwN2M4ZjA5MWQiLCJpYXQiOjE1NDIzMjIyODZ9.3NA07bXGVjU1B81YpsD9tM4ekVhxvbZNUAUjr4bjlMo'

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 253
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Nov 2018 00:05:06 GMT
ETag: W/"fd-CJ/XsUPKmwGJBNEXdiFwFyGs8Mw"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AdmXN71WPKtmE3BNwlwQ1rw8LMpmSzqtF.ZjF4a9gJndmAWYv77sy3RA7ZqjKTPsp%2B9kjJX4UOr4c; Path=/; HttpOnly

[
    {
        "__v": 0,
        "_id": "5bedfa379e0abbc5e99c7ba6",
        "authorId": "5bbd104f61fdf30d00163d77",
        "comments": "[]",
        "photos": "link",
        "text": "cool thangs",
        "title": "new post"
    },
    {
        "__v": 0,
        "_id": "5bee08c69e0abbc5e99c7ba7",
        "authorId": "5bbd104f61fdf30d00163d77",
        "comments": "[]",
        "photos": "another link",
        "text": "cooler thangs",
        "title": "newer post"
    }
]
```

</p>
</details>


<details><summary>one message</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## GET: /api/message/:id
#### http GET localhost:8000/api/message/5bedfa379e0abbc5e99c7ba6 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkMzc5ZjYyYzk2Nzk5N2VhNWJiMjY2NGE0YjFiZDRkMjllZDQyNGQzYWM3YjlhZWNlNGNjNDMwN2M4ZjA5MWQiLCJpYXQiOjE1NDIzMjIyODZ9.3NA07bXGVjU1B81YpsD9tM4ekVhxvbZNUAUjr4bjlMo'

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Content-Length: 125
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Nov 2018 00:24:49 GMT
ETag: W/"7d-2cSgoICnt6EY0VdNTjAN1oM0uQA"
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3AMt40DNcZX3C_FGtPfjYQJG-PuTVF9yLQ.S1tGNhixxMRFG92LGzHX60JNQtM1188HiBysEBtt%2FF8; Path=/; HttpOnly

{
    "__v": 0,
    "_id": "5bedfa379e0abbc5e99c7ba6",
    "authorId": "5bbd104f61fdf30d00163d77",
    "comments": "[]",
    "photos": "link",
    "text": "cool thangs",
    "title": "new post"
}
```

</p>
</details>


<details><summary>edit message</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## PUT: /api/message/edit/:id
#### http PUT localhost:8000/api/message/edit/5bedfa379e0abbc5e99c7ba6 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkMzc5ZjYyYzk2Nzk5N2VhNWJiMjY2NGE0YjFiZDRkMjllZDQyNGQzYWM3YjlhZWNlNGNjNDMwN2M4ZjA5MWQiLCJpYXQiOjE1NDIzMjIyODZ9.3NA07bXGVjU1B81YpsD9tM4ekVhxvbZNUAUjr4bjlMo' text='coolest thang' title='newest post' photos='[new link, some other link]'

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

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8000/api/login

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 226
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:52:38 GMT
ETag: W/"e2-Ua/tX3cU0Ed06ScvrZiI+GlrQnw"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjE0MDJlNWZhYWMxZTZiYWI2NDQyM2MyYzZkZjI0ODY3MjUyZDEyZTM2YTBjMDNkOThmYTE3YzI2NmRiNjQwZjIiLCJpYXQiOjE1MzkxMTgzNTh9.TEXsbn2VaBRZJ8hIrUQ6r3MY33esJshWQ12mZWlVf2o; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:52:38 GMT
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "absherlogan@gmail.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "$2b$10$tH45HtJ4By.jIn.F9LokY.1iIHDIgBrcUxVI3b/qFLP6Oppuo3j3a"
}
```

## PUT: /api/message/remove/:id
#### http DELETE localhost:8000/api/message/remove/5bee1345321d18e6ad8335c6 Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJkMzc5ZjYyYzk2Nzk5N2VhNWJiMjY2NGE0YjFiZDRkMjllZDQyNGQzYWM3YjlhZWNlNGNjNDMwN2M4ZjA5MWQiLCJpYXQiOjE1NDIzMjIyODZ9.3NA07bXGVjU1B81YpsD9tM4ekVhxvbZNUAUjr4bjlMo'

```
HTTP/1.1 204 No Content
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8080
Connection: keep-alive
Date: Fri, 16 Nov 2018 00:50:56 GMT
Vary: Origin
X-Powered-By: Express
set-cookie: connect.sid=s%3A7hoHwvLELz9yckSpiKwJUi6fsgnA85rS.CERcAvQRj7RyQ4krO1elIwDllekgUNqhECfQdGXjS4I; Path=/; HttpOnly
```

</p>
</details>
