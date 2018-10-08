# **backend api guide**
### **Note** I am using httpie to make all backend calls, you can find a download here: // NOTE: add link

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
        "_id": "5bbbae82841a2339b3f2d02d",
        "created_at": "2017-06-14T19:35:28Z",
        "name": "01-mobile-first-corrected",
        "size": 2189,
        "updated_at": "2017-06-14T19:35:30Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae81841a2339b3f2d02b",
        "created_at": "2017-08-10T20:39:05Z",
        "name": "ResponsibleConsumption",
        "size": 3174,
        "updated_at": "2017-08-11T17:36:13Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae81841a2339b3f2d02a",
        "created_at": "2017-09-14T19:58:46Z",
        "name": "responsible-consumption-frontend",
        "size": 448,
        "updated_at": "2018-05-23T20:37:06Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d030",
        "created_at": "2017-06-14T19:27:43Z",
        "name": "01-mobile-first",
        "size": 2184,
        "updated_at": "2017-06-14T19:27:44Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d02f",
        "created_at": "2017-04-03T14:52:52Z",
        "name": "dinner-and-a-movie",
        "size": 19377,
        "updated_at": "2017-04-05T23:31:34Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae81841a2339b3f2d02c",
        "created_at": "2017-03-23T23:27:45Z",
        "name": "08-sql-intro",
        "size": 639,
        "updated_at": "2017-04-27T23:44:18Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d031",
        "created_at": "2017-03-28T22:39:26Z",
        "name": "11-SPA-routing",
        "size": 436,
        "updated_at": "2017-03-28T22:39:28Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d032",
        "created_at": "2017-06-14T19:35:28Z",
        "name": "01-mobile-first-corrected",
        "size": 2189,
        "updated_at": "2017-06-14T19:35:30Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d02e",
        "created_at": "2017-03-30T23:37:00Z",
        "name": "14-managing-state",
        "size": 439,
        "updated_at": "2017-03-30T23:37:01Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d033",
        "created_at": "2018-06-22T20:09:22Z",
        "name": "01-node-ecosystem",
        "size": 4,
        "updated_at": "2018-06-22T20:56:52Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d034",
        "created_at": "2017-03-15T23:06:23Z",
        "name": "03-jQuery-and-events",
        "size": 44,
        "updated_at": "2017-03-15T23:06:24Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d036",
        "created_at": "2017-07-18T18:51:37Z",
        "name": "02-tools_and_context",
        "size": 5,
        "updated_at": "2017-07-18T22:27:47Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d035",
        "created_at": "2017-03-21T06:34:12Z",
        "name": "05-form-building-workshop",
        "size": 64,
        "updated_at": "2017-03-21T06:34:14Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d037",
        "created_at": "2017-03-24T23:19:48Z",
        "name": "09-sql-joins-relations",
        "size": 427,
        "updated_at": "2017-03-24T23:19:49Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03b",
        "created_at": "2017-07-26T19:29:35Z",
        "name": "08-vanilla_rest_api",
        "size": 8,
        "updated_at": "2017-07-27T20:09:27Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03c",
        "created_at": "2017-08-01T19:44:45Z",
        "name": "12-express-middleware",
        "size": 6,
        "updated_at": "2017-08-01T19:43:35Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d039",
        "created_at": "2017-08-08T19:35:40Z",
        "name": "17-bearer-auth",
        "size": 9,
        "updated_at": "2017-08-09T02:42:56Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d041",
        "created_at": "2017-07-17T20:07:07Z",
        "name": "01-node_ecosystem",
        "size": 5,
        "updated_at": "2017-07-17T23:19:13Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03a",
        "created_at": "2017-03-17T00:57:58Z",
        "name": "04-templates",
        "size": 37,
        "updated_at": "2017-03-17T00:58:00Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d046",
        "created_at": "2017-08-24T18:16:38Z",
        "name": "201-demo-code",
        "size": 3,
        "updated_at": "2017-08-24T18:16:38Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03e",
        "created_at": "2017-01-09T21:20:26Z",
        "name": "201-Objects",
        "size": 124,
        "updated_at": "2017-01-10T18:14:35Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04b",
        "created_at": "2017-03-14T23:06:10Z",
        "name": "02-jquery-DOM",
        "size": 33,
        "updated_at": "2017-03-14T23:06:12Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d038",
        "created_at": "2017-03-29T23:16:57Z",
        "name": "12-REST-and-APIs",
        "size": 438,
        "updated_at": "2017-03-29T23:16:58Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03f",
        "created_at": "2017-08-28T19:54:13Z",
        "name": "26-react-redux",
        "size": 0,
        "updated_at": "2017-08-28T19:35:47Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d050",
        "created_at": "2017-01-03T21:22:33Z",
        "name": "201-Home-Work",
        "size": 6405,
        "updated_at": "2017-01-06T16:33:03Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d043",
        "created_at": "2017-07-25T18:46:46Z",
        "name": "07-http_servers",
        "size": 4,
        "updated_at": "2017-07-26T02:13:58Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d03d",
        "created_at": "2017-08-08T18:21:23Z",
        "name": "16-basic-auth",
        "size": 6,
        "updated_at": "2017-08-08T19:34:06Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d055",
        "created_at": "2018-06-22T21:00:59Z",
        "name": "02-tools-and-context",
        "size": 0,
        "updated_at": "2018-06-22T21:01:02Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d044",
        "created_at": "2017-03-27T23:43:44Z",
        "name": "10-functional-programming",
        "size": 427,
        "updated_at": "2017-03-27T23:43:46Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d040",
        "created_at": "2017-08-24T17:13:56Z",
        "name": "401-demo-code",
        "size": 17657,
        "updated_at": "2017-08-24T17:15:34Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d042",
        "created_at": "2017-07-19T19:06:32Z",
        "name": "03-parallel_file_system",
        "size": 6,
        "updated_at": "2017-07-20T04:07:02Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d048",
        "created_at": "2017-09-05T23:51:53Z",
        "name": "31-async-actions",
        "size": 1,
        "updated_at": "2017-09-05T19:36:08Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05a",
        "created_at": "2017-08-21T21:22:11Z",
        "name": "21-react-tooling",
        "size": 4,
        "updated_at": "2017-08-24T02:23:52Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d049",
        "created_at": "2017-01-19T23:59:15Z",
        "name": "Adventure-Fellows",
        "size": 42128,
        "updated_at": "2017-01-24T06:15:46Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d047",
        "created_at": "2017-09-12T20:05:50Z",
        "name": "22-forms-and-props",
        "size": 1,
        "updated_at": "2017-08-22T19:18:36Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04c",
        "created_at": "2017-07-20T18:42:41Z",
        "name": "04-bitmap_transformer",
        "size": 25,
        "updated_at": "2017-07-24T15:44:46Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04d",
        "created_at": "2017-03-22T23:13:19Z",
        "name": "07-nodejs-npm",
        "size": 423,
        "updated_at": "2017-03-22T23:13:21Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d045",
        "created_at": "2017-08-02T19:06:42Z",
        "name": "13-mongodb",
        "size": 6,
        "updated_at": "2017-08-03T04:19:27Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d051",
        "created_at": "2017-08-23T22:14:24Z",
        "name": "23-components_and_routing",
        "size": 5,
        "updated_at": "2017-08-24T01:55:59Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04e",
        "created_at": "2017-07-31T18:57:12Z",
        "name": "11-express-api",
        "size": 5,
        "updated_at": "2017-08-01T05:55:40Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d056",
        "created_at": "2017-07-24T20:10:56Z",
        "name": "06-tcp_servers",
        "size": 4,
        "updated_at": "2017-07-25T01:38:47Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d052",
        "created_at": "2017-09-13T01:43:03Z",
        "name": "36-oauth",
        "size": 1,
        "updated_at": "2017-09-12T19:11:34Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05b",
        "created_at": "2017-08-24T18:10:11Z",
        "name": "301-demo-code",
        "size": 6,
        "updated_at": "2017-08-24T18:14:44Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d053",
        "created_at": "2017-01-17T19:11:11Z",
        "name": "bus-mall",
        "size": 1955,
        "updated_at": "2017-01-17T19:11:11Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d057",
        "created_at": "2017-07-27T20:17:50Z",
        "name": "09-vanilla_api_persistence",
        "size": 6,
        "updated_at": "2017-07-28T05:40:49Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d058",
        "created_at": "2017-03-30T18:39:38Z",
        "name": "13-deployment",
        "size": 3022,
        "updated_at": "2017-03-30T18:39:39Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05c",
        "created_at": "2017-01-05T21:57:12Z",
        "name": "About-Me",
        "size": 7,
        "updated_at": "2017-01-05T21:57:14Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05d",
        "created_at": "2017-01-11T21:37:36Z",
        "name": "cookie-stand",
        "size": 107,
        "updated_at": "2017-01-11T21:37:38Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04a",
        "created_at": "2018-09-30T17:22:26Z",
        "name": "CSC-141",
        "size": 660,
        "updated_at": "2018-10-01T18:52:30Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d04f",
        "created_at": "2017-08-04T21:05:14Z",
        "name": "14-two-resource-api",
        "size": 1,
        "updated_at": "2017-08-03T18:58:35Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d054",
        "created_at": "2018-10-01T20:12:16Z",
        "name": "CSE_142",
        "size": 5,
        "updated_at": "2018-10-01T20:27:47Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d059",
        "created_at": "2017-08-10T21:51:25Z",
        "name": "18-aws-s3",
        "size": 1,
        "updated_at": "2017-08-09T18:42:50Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05e",
        "created_at": "2017-05-18T19:58:00Z",
        "name": "games",
        "size": 257,
        "updated_at": "2017-05-18T19:58:00Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d05f",
        "created_at": "2017-01-06T22:11:04Z",
        "name": "201d18-lab-5",
        "size": 11,
        "updated_at": "2017-01-06T22:11:06Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d061",
        "created_at": "2018-06-22T21:03:02Z",
        "name": "501",
        "size": 19,
        "updated_at": "2018-07-28T03:51:36Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d063",
        "created_at": "2017-05-01T18:59:24Z",
        "name": "flower-stats",
        "size": 565,
        "updated_at": "2017-05-02T18:03:26Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d064",
        "created_at": "2017-05-03T00:02:39Z",
        "name": "cheat-sheet",
        "size": 0,
        "updated_at": "2017-05-03T00:02:39Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d060",
        "created_at": "2017-08-29T23:02:53Z",
        "name": "27-combining-reducers",
        "size": 1,
        "updated_at": "2017-08-29T19:16:14Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d062",
        "created_at": "2017-01-13T20:22:54Z",
        "name": "chocolate-pizza",
        "size": 699,
        "updated_at": "2017-01-13T20:30:22Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d065",
        "created_at": "2018-10-01T19:09:38Z",
        "name": "CSE_143",
        "size": 5,
        "updated_at": "2018-10-01T20:14:42Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d066",
        "created_at": "2016-12-11T01:30:59Z",
        "name": "loganabsher.github.io",
        "size": 2662,
        "updated_at": "2016-12-11T02:13:56Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d069",
        "created_at": "2018-10-02T19:07:16Z",
        "name": "portfolio",
        "size": 11,
        "updated_at": "2018-10-02T19:38:23Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d068",
        "created_at": "2017-03-21T22:20:11Z",
        "name": "seattle-301d18",
        "size": 8327,
        "updated_at": "2017-03-21T22:20:13Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae82841a2339b3f2d067",
        "created_at": "2018-10-02T19:07:16Z",
        "name": "portfolio",
        "size": 11,
        "updated_at": "2018-10-02T19:38:23Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d06a",
        "created_at": "2018-05-25T00:53:04Z",
        "name": "javascript-algorithms",
        "size": 1590,
        "updated_at": "2018-05-25T00:53:07Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d06e",
        "created_at": "2017-02-21T19:06:16Z",
        "name": "Guessing-Game",
        "size": 3,
        "updated_at": "2017-02-21T19:15:50Z"
    },
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
        "_id": "5bbbae83841a2339b3f2d06b",
        "created_at": "2017-07-12T03:38:02Z",
        "name": "Plug-And-Play-Energy",
        "size": 59018,
        "updated_at": "2017-08-06T00:14:12Z"
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
        "_id": "5bbbae83841a2339b3f2d06d",
        "created_at": "2017-12-19T23:55:48Z",
        "name": "ui-ux-exercise1",
        "size": 273,
        "updated_at": "2017-12-20T21:18:55Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d071",
        "created_at": "2016-01-02T23:48:44Z",
        "name": "thesite",
        "size": 0,
        "updated_at": "2016-01-02T23:48:44Z"
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
        "_id": "5bbbae83841a2339b3f2d076",
        "created_at": "2017-02-15T19:51:18Z",
        "name": "Maddie-s-Memories",
        "size": 3,
        "updated_at": "2017-02-15T19:56:45Z"
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
        "_id": "5bbbae83841a2339b3f2d075",
        "created_at": "2017-09-06T16:04:42Z",
        "name": "sluggram",
        "size": 226,
        "updated_at": "2017-09-06T16:04:44Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d074",
        "created_at": "2017-05-03T19:07:21Z",
        "name": "portfolio-2.0",
        "size": 276,
        "updated_at": "2017-05-08T22:35:04Z"
    },
    {
        "__v": 0,
        "_id": "5bbbae83841a2339b3f2d077",
        "created_at": "2017-03-21T16:22:15Z",
        "name": "portfolio-1",
        "size": 608,
        "updated_at": "2017-03-21T16:22:18Z"
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
