# twentythree - exercise

## create tables in your Postgres DB:
```
CREATE TABLE video (
    video_id int primary key,
    video_length real,
    create_date timestamp not null DEFAULT now()
);
```

```
CREATE TABLE userinfo (
    user_ip inet not null,
    user_agent varchar(20),
    video_id int REFERENCES video,
    play_start real,
    play_end real,
    create_date timestamp not null DEFAULT now()
);
```

## Set the following ENV VARs for your DB Connections:
export DB_USER=''  DB='' DB_PASS='' DB_HOST='' DB_PORT='' DB_MAX_CLIENTS='' DB_IDLE_TIMEOUT_MS=''

## Healthcheck:
GET - /healthcheck

## Ingest Data:
POST - /ingestuser

body (required):
```
{
	"user_ip": "1.2.3.4",
	"user_agent": "Google Chrome",
	"video_id": 1234,
	"play_start": 0.0,
	"play_end": 10.0
}
```

## Get Data:
GET - /getvideo/:videoid

example: /getvideo/1234

pass in what modules you would like returned in the order you want: 
/getvideo/1234?modules=average,browser,usercount,most

just remove a parameter if you do not the data returned in the JSON response





