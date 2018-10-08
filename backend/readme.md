# **backend api guide**
### **Note** I am using httpie to make all backend calls, you can find a download here: // NOTE: add link

### User Routes:

<details><summary>signup</summary>
<p>

#### http POST localhost:8080/api/signup  password=123 email=absherlogan@gmail.com

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 207
Content-Type: application/json; charset=utf-8
Date: Mon, 08 Oct 2018 21:02:32 GMT
ETag: W/"cf-9JII08DA9AtbtFnYLYjoXs9JDjo"
Set-Cookie: Special-Cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzZTFlNGY0NWUwYzE5ZmU3ZTg5MjgxOTFiMjFlNTczOTFhNzliYzNjYTI3NmFmMzkxZGNlOGM4MzIxMjRhMTgiLCJpYXQiOjE1MzkwMzI1NTJ9.kRHurt8XhS-dAeonmmEQzkjBE06W-EMiDR8aBcPEvLw; Max-Age=900000; Path=/; Expires=Fri, 19 Oct 2018 07:02:32 GMT
X-Powered-By: Express

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImYzZTFlNGY0NWUwYzE5ZmU3ZTg5MjgxOTFiMjFlNTczOTFhNzliYzNjYTI3NmFmMzkxZGNlOGM4MzIxMjRhMTgiLCJpYXQiOjE1MzkwMzI1NTJ9.kRHurt8XhS-dAeonmmEQzkjBE06W-EMiDR8aBcPEvLw"
```

</p>
</details>




### Repository Routes:

<details><summary>repositories/all</summary>
<p>

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
