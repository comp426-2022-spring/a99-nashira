## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body
```
200 OK
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/plain
Date: Sat, 30 Apr 2022 14:30:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/dailyLogResults (GET)

#### Request cURL

```
curl http://localhost:5000/app/dailyLogResults
```

#### Response body
```
{"id":1,"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 142
ETag: W/"8e-ZrpZqIy+7kTfKWfkif7nSaaoboM"
Date: Sat, 30 Apr 2022 14:35:20 GMT
Connection: keep-alive
```

### /app/dailyLog (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}' http://localhost:5000/app/dailyLog/ 
```

#### Response body
```
{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 135
ETag: W/"87-BfVumJWJWlCRlWb+/z2MUmNcEWM"
Date: Sat, 30 Apr 2022 14:42:28 GMT
Connection: keep-alive
```
### /app/signup/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}' http://localhost:5555/app/signup/  
```

#### Response body
```
{"message":"Your account has been created! Login in to your account!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 70
ETag: W/"46-WdcaLiLF7hmcp6JTTYujJ2RuG6Y"
Date: Sat, 30 Apr 2022 15:10:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
### /app/login/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"uname":"vlalitha","name":"Lalitha","sleep":8,"sleepQuality":"good","appetite":"neutral","mood":"okay","reflect":"Final Exam stress!"}' http://localhost:5555/app/login/ 
```

#### Response body
```
{"uname":"vlalitha","message":"Logged in!"}
```

#### Response headers
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 43
ETag: W/"2b-hc6uJFSdAxr2kMDLO7E98wuhu6w"
Date: Sat, 30 Apr 2022 15:14:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```