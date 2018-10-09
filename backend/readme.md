# **backend api guide**
### **Note** I am using httpie to make all backend calls, you can find a download here: // NOTE: add link

### User Routes:

<details><summary>signup</summary>
<p>

## POST: /api/signup
#### http POST localhost:8080/api/signup  password=123 email=absherlogan@gmail.com

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:32:16 GMT
ETag: W/"cf-j0f4nsY/RiDdqEsv3CVp111Phh4"
Set-Cookie: login-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIyMGFmNmMwMjc4MjdhZjcxZTk1YTgwNTJmOGVhNDQ5NzlhODM0NGRkZWM1OWFkZTMzYjE1ZDAzNjhkZGU1YzYiLCJpYXQiOjE1MzkxMTcxMzZ9.OxesvIKJpOiNgZsSZtScvC_KzAY_-49dR12qJyHOvTI; Max-Age=900000; Path=/; Expires=Sat, 20 Oct 2018 06:32:16 GMT
X-Powered-By: Express

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjIyMGFmNmMwMjc4MjdhZjcxZTk1YTgwNTJmOGVhNDQ5NzlhODM0NGRkZWM1OWFkZTMzYjE1ZDAzNjhkZGU1YzYiLCJpYXQiOjE1MzkxMTcxMzZ9.OxesvIKJpOiNgZsSZtScvC_KzAY_-49dR12qJyHOvTI"
```

</p>
</details>

<details><summary>login</summary>
<p>

## GET: /api/login
#### http -a absherlogan@gmail.com:123 GET localhost:8080/api/login

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

</p>
</details>

<details><summary>all accounts</summary>
<p>

## GET: /api/allaccounts
#### http GET localhost:8080/api/allaccounts

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 25
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:48:33 GMT
ETag: W/"19-4pue+lS8iqXKAMmRQun4UZijiQE"
X-Powered-By: Express

[
    "absherlogan@gmail.com"
]
```

</p>
</details>

<details><summary>edit account</summary>
<p>

## PUT: /api/editaccount/:id
#### http -a absherlogan@gmail.com:123 PUT localhost:8080/api/editaccount/5bbd104f61fdf30d00163d77 email=newuser@new.com password=321

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 163
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 20:54:56 GMT
ETag: W/"a3-Yy1RCDkTOvD+s24aFE5fX3C7rpU"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bbd104f61fdf30d00163d77",
    "email": "newuser@new.com",
    "findHash": "1402e5faac1e6bab64423c2c6df24867252d12e36a0c03d98fa17c266db640f2",
    "password": "321"
}
```

</p>
</details>

<details><summary>delete account</summary>
<p>

## DELETE: /api/deleteaccount/:id
#### http -a newuser@new.com:321 DELETE localhost:8080/api/deleteaccount/5bbd104f61fdf30d00163d77

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 271
Content-Type: application/json; charset=utf-8
Date: Tue, 09 Oct 2018 21:06:30 GMT
ETag: W/"10f-Hwtvn8EOLbswQsW4xNao1iue5nc"
X-Powered-By: Express

{
    "$clusterTime": {
        "clusterTime": "6610466581401042945",
        "signature": {
            "hash": "l1pLszrCDncmLfpFHhGq0xGRFhg=",
            "keyId": "6609980859254571009"
        }
    },
    "electionId": "7fffffff0000000000000001",
    "n": 1,
    "ok": 1,
    "opTime": {
        "t": 1,
        "ts": "6610466581401042945"
    },
    "operationTime": "6610466581401042945"
}
```

</p>
</details>




### Repository Routes:

<details><summary>repositories/all</summary>
<p>


## GET: /api/repositories/all
#### http GET localhost:8080/api/repositories/all

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


<details><summary>repositories/:id</summary>
<p>

## GET: /api/repositories/:id
#### http GET localhost:8080/api/repositories/5bbbae83841a2339b3f2d06f/

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
